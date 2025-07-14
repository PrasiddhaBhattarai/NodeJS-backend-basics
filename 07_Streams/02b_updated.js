const fs = require('fs'); 
const crypto = require('crypto');
const zlib = require('zlib');
const { Transform } = require('stream');

const keyHex = 'ecc8dcf77944cdda4dd902531a5990b494b4f43e29c6dd3cf454ad65b5350aee';
const key = Buffer.from(keyHex, 'hex');  // Convert hex string to Buffer

class DecryptStream extends Transform {
  constructor(key, iv) {
    super();
    this.key = key;
    this.iv = iv;
    this.decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  }

  _transform(chunk, encoding, callback) {
    try {
      const decryptedChunk = this.decipher.update(chunk);
      this.push(decryptedChunk);
      callback();
    } catch (err) {
      callback(err);
    }
  }

  _flush(callback) {
    try {
      const finalChunk = this.decipher.final();
      this.push(finalChunk);
      callback();
    } catch (err) {
      callback(err);
    }
  }
}

// Decryption Pipeline
const encryptedFile = 'output2.txt.gz.enc';
const decryptedFile = 'output_decrypted.txt';

const encryptedStream = fs.createReadStream(encryptedFile);

// We'll read the first 16 bytes (IV) manually
let ivBuffer = Buffer.alloc(16);
let bytesRead = 0;
let ivExtracted = false;

const passThrough = new Transform({
  transform(chunk, encoding, callback) {
    if (!ivExtracted) {
      const remainingIVBytes = 16 - bytesRead;
      if (chunk.length >= remainingIVBytes) {
        chunk.copy(ivBuffer, bytesRead, 0, remainingIVBytes);
        ivExtracted = true;
        bytesRead += remainingIVBytes;

        // Emit custom event when IV is fully extracted
        passThrough.emit('ivReady');

        // Push remaining data after IV
        this.push(chunk.slice(remainingIVBytes));
      } else {
        chunk.copy(ivBuffer, bytesRead, 0, chunk.length);
        bytesRead += chunk.length;
      }
      callback();
    } else {
      this.push(chunk);
      callback();
    }
  }
});

// Listen for our custom 'ivReady' event
passThrough.once('ivReady', () => {
  const decryptStream = new DecryptStream(key, ivBuffer);
  const gunzipStream = zlib.createGunzip();
  const outputStream = fs.createWriteStream(decryptedFile);

  passThrough
    .pipe(decryptStream)
    .pipe(gunzipStream)
    .pipe(outputStream)
    .on('finish', () => {
      console.log('Decryption and decompression complete!');
    })
    .on('error', (err) => {
      console.error('Pipeline error:', err);
    });
});

// Start reading
encryptedStream.pipe(passThrough);
