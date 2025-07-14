//this file has few logic flaws, more correct file is stream_encrypt

// Types of Stream
// 
//readable -> user for read
//writable -> write to file
//duplex -> can be used for both read and write (TCP socket)
// transform -> Duplex streams that can modify or transform data
//           -> Used for compression, encryption, etc
//           -> zlib steams


// 🧩 Summary of program:
// 
// You’re reading a file, compressing it on-the-fly, then encrypting the compressed data, and finally writing it out.
// 
// This is efficient for big files because everything is done in chunks with streams, not loading everything into memory.
// 
// This setup is great for securely storing compressed and encrypted backups, logs, or any sensitive file data.


// Following modules are built into nodejs, no additional installation required.

const fs = require('fs');

const zlib = require('zlib'); // compression gzip
// zlib is a built-in module in Node.js that provides compression and decompression functionalities using the Gzip, Deflate, and related algorithms.

const crypto = require('crypto');
// In Node.js, the crypto module provides cryptographic functionality, including a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions. It's useful for tasks like password hashing, encryption, data integrity, and digital signatures.

const { Transform } = require('stream');
//  imports the Transform class from the built-in stream module.


class EncryptStream extends Transform {
    constructor(key, vector) {
        super();
        this.key = key;
        this.vector = vector;
    }

    // chunk: A piece of data from the input stream (usually a Buffer, sometimes a string).
    // 
    // encoding: Used if the chunk is a string. Often ignored when dealing with Buffers.
    // 
    // callback: A function you must call to signal that this chunk has been processed. If an error occurred, call callback(err). Otherwise, callback() to continue.
    _transform(chunk, encoding, callback) {

        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
        // Encrypts the current chunk of data.
        // Returns a Buffer containing the encrypted result.
        // Can be called multiple times for large input.

        const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]); //encrypt the chunk
        // Finishes the encryption.
        // Pads the final block(if needed) and flushes the remainder.
        // Must be called once at the end of each encryption session.
        // Also returns a Buffer.

        // Why is cipher.final() needed?
        // Block ciphers like AES-256-CBC operate on fixed-size blocks (16 bytes for AES). That means:
        // If your data doesn't perfectly align with 16-byte chunks, the cipher needs to pad the last block.
        // If you don’t call cipher.final(), that last incomplete block will be lost or invalid.

        this.push(encrypted);
        //Pushes the encrypted Buffer to the readable side of the stream.
        // Makes it available to the next stage in a stream pipeline.

        callback();
        // its to signal
        // ✅ “I'm done processing this chunk — go ahead and send me the next one.”
    }
}

const key = crypto.randomBytes(32);
// 32 random bytes for AES-256 encryption key.

const vector = crypto.randomBytes(16);
// 16 random bytes for AES initialization vector (IV).

const readableStream = fs.createReadStream('input.txt');

// new gzip object to compress stream of data
const gzipStream = zlib.createGzip();
// Creates a transform stream that compresses data using gzip.
// As data flows in, it compresses chunks and outputs compressed chunks.

const encryptStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream('output.txt.gz.enc');

//read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log('Streaming -> Compressing -> Writing Data');


// ⚠️ Important Notes:
// You need to save or transmit the key and IV securely to be able to decrypt later.
// 
// The output file is not readable directly; it must be decrypted and decompressed in the reverse order.
// 
// To decrypt:
// 
// 1) Read the encrypted file,
// 
// 2) Pipe through your DecryptStream,
// 
// 3) Then pipe through zlib.createGunzip(),
// 
// 4) And finally write to the original file or use the data as needed.