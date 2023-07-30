import crypto from "crypto";

const SECRET = process.env.CIPHER_KEY;
const ALGORITHM = "aes-256-cbc";
const SHA512 = "sha512";
const IN_ENCODING = "utf8";
const OUT_ENCODING = "base64";

type Return = {
  password: string;
  salt: string;
};

const encode = (buffer?: string): string => {
  let result = "";

  if (buffer === undefined) {
    return "";
  } else {
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      SECRET,
      SECRET.substring(0, 16)
    );
    result = cipher.update(buffer, IN_ENCODING, OUT_ENCODING);
    result += cipher.final(OUT_ENCODING);
  }

  return result;
};

const decode = (buffer?: string): string => {
  let result = "";

  if (buffer === undefined) {
    return "";
  } else {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      SECRET,
      SECRET.substring(0, 16)
    );
    result = decipher.update(buffer, OUT_ENCODING, IN_ENCODING);
    result += decipher.final(IN_ENCODING);
  }
  return result;
};

const create = (buffer: string): Promise<Return> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(64).toString(OUT_ENCODING);
    crypto.pbkdf2(buffer, salt, 10085, 64, SHA512, (err, key) => {
      if (err) {
        reject(err);
      } else {
        const result = key.toString(OUT_ENCODING);
        resolve({ password: result, salt: salt });
      }
    });
  });
};
//
const compare = (
  buffer: string,
  oldPassword: string,
  oldSalt: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(buffer, oldSalt, 10085, 64, SHA512, (err, key) => {
      if (err) {
        reject(err);
      } else {
        const result = key.toString(OUT_ENCODING);
        if (result === oldPassword) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

export { encode, decode, create, compare };
