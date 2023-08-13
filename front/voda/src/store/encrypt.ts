import {AES, enc} from 'crypto-js';

const secretKey = process.env.REACT_APP_REDUX_CRYPT_KEY;

export function encryptData(data: any){
  return AES.encrypt(data, secretKey).toString();
}

export function decryptData(encrypted: any){
  const bytes = AES.decrypt(encrypted, secretKey);
  return bytes.toString(enc.Utf8);
}