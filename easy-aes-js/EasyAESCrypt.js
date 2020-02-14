module.exports = (key, bit, iv) => {
  const crypto = require('crypto');
  const algorithm = 'aes-128-cbc';
  const hashAlgorithm = bit === 256 ? 'sha256' : 'md5';

  const hashKey = crypto
    .createHash(hashAlgorithm)
    .update(key || '****************')
    .digest('raw');
  const hashIv = crypto
    .createHash(hashAlgorithm)
    .update(iv || '################')
    .digest('raw');

  const encrypt = data => {
    let cipher = crypto.createCipheriv(algorithm, hashKey, hashIv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
  };
  const decrypt = data => {
    let encryptedText = Buffer.from(data, 'base64');
    let decipher = crypto.createDecipheriv(algorithm, hashKey, hashIv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  };
  return {
    encrypt: encrypt,
    decrypt: decrypt
  };
};
