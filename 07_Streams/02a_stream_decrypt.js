// program to decrypt the encrypted file in 01_.... file
// first get through this file, then to 02b_... file

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
      // Calculate how many bytes still needed for IV
      const remainingIVBytes = 16 - bytesRead;
      if (chunk.length >= remainingIVBytes) {
        // Copy the rest of IV bytes
        chunk.copy(ivBuffer, bytesRead, 0, remainingIVBytes);
        // sourceBuffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd)
        // targetBuffer: where the data will go
        // 
        // targetStart: index in the target buffer to start writing (default: 0)
        // 
        // sourceStart: index in the source buffer to start copying (default: 0)
        // 
        // sourceEnd: index to stop copying from source (exclusive, default: source.length)

        ivExtracted = true;
        bytesRead += remainingIVBytes;

        // Push remaining chunk data after IV to downstream
        this.push(chunk.slice(remainingIVBytes));
      } else {
        // Not enough data for full IV, accumulate more
        // so this.push() isn't yet used, so no chunks are passed through
        chunk.copy(ivBuffer, bytesRead, 0, chunk.length);
        bytesRead += chunk.length;
      }
      callback();
    } else {
      // IV already extracted, just push data downstream
      // i.e. push all chunks to successor pipes
      this.push(chunk);
      callback();
    }
  }
});

passThrough.on('end', () => {
  if (!ivExtracted) {
    console.error('Error: IV not fully extracted from file');
  }
});

// below event runs only once, but it does add pipes to the pipeline which stays in pipeline in future chunks regardless of this event running in future
passThrough.once('readable', () => {
  if (ivExtracted) {
    // Create decrypt stream with extracted IV
    const decryptStream = new DecryptStream(key, ivBuffer);
    const gunzipStream = zlib.createGunzip();
    const outputStream = fs.createWriteStream(decryptedFile);

    //encryptedStream -> passThrough -> below_pipes
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
  }
});

// Start reading
encryptedStream.pipe(passThrough);


// the use of .once('readable') looks confusing and unnecessary here
// we can emit custom events as in next file