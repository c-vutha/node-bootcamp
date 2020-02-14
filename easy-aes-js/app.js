const EasyAESCrypt = require('./EasyAESCrypt');
const cipher = EasyAESCrypt('****************', 128, '################');

const message = 'c-vutha';
const encrypted = cipher.encrypt(message);
const decrypted = cipher.decrypt(encrypted);

console.log('Message: ', message);
console.log('Encrypted: ', encrypted);
console.log('Decrypted: ', decrypted);
