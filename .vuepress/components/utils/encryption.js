import CryptoJS from "crypto-js";
// 密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("SqJiGf3bGTddiTle");
// 密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("KM8DB2h9lROUeZBX");
/**
 * 加密方法
 * @param data
 * @returns {string}
*/
export function encrypt(data) {
  if (!data) return ''
  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      console.log("encrypt error:", error);
    }
  }
  try {
    const dataHex = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY,{
      iv: SECRET_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    // return encrypted.ciphertext.toString();
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  } catch (error) {
    return data
  }
}


/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function decrypt(data) {
  if (!data) return ''
  try {
    // const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    let encryptedHexStr = CryptoJS.enc.Base64.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
      iv: SECRET_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  } catch (error) {
    return data
  }
}