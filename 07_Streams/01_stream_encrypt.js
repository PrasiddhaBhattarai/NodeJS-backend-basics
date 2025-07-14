const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');
const { Transform } = require('stream');

class EncryptStream extends Transform {
    constructor(key, iv) {
        super();
        this.key = key;
        this.iv = iv;
        this.cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    }

    _transform(chunk, encoding, callback) {
        try {
            const encryptedChunk = this.cipher.update(chunk);
            this.push(encryptedChunk);
            callback();
        } catch (err) {
            callback(err);
        }
    }

    _flush(callback) {
        try {
            const finalChunk = this.cipher.final();
            this.push(finalChunk);
            callback();
        } catch (err) {
            callback(err);
        }
    }
    // _flush is called automatically by Node.js after the input stream ends, but only if you're working with a Transform stream.
    // 
    // Called once, when the input stream ends.
    // 
    // Calls cipher.final() to:
    // 
    // Flush any internal buffers.
    // 
    // Add final block padding.
    // 
    // Required to complete the encryption stream properly.
}

// Encryption Pipeline
const key = crypto.randomBytes(32);
const keyHex = key.toString('hex');       // convert to hex string
console.log('Hex:', keyHex);
// const key = Buffer.from(keyHex, 'hex');  // convert back to buffer
const iv = crypto.randomBytes(16);

const readableStream = fs.createReadStream('input.txt');
const gzipStream = zlib.createGzip();
const encryptStream = new EncryptStream(key, iv);

// Write IV first, then pipe encrypted data
const writableStream = fs.createWriteStream('output2.txt.gz.enc');

// Write the IV at the very beginning of the output file
writableStream.write(iv);

readableStream
    .pipe(gzipStream)
    .on('error', (err) => {
        console.error('Gzip error:', err);
    })
    .pipe(encryptStream)
    .on('error', (err) => {
        console.error('Encryption error:', err);
    })
    .pipe(writableStream)
    .on('error', (err) => {
        console.error('Write error:', err);
    })
    .on('finish', () => {
        console.log('Encryption & compression done!');
        // Save or transmit 'key' securely for decryption later!
    });
