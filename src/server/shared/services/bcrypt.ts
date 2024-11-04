import { compare, genSalt, hash } from "bcrypt";

const SALT_RANDOMS = 8;

const passwordHashed = async (password: string) => {
  const saltGenerate = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerate);
};

const passwordVerify = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const bcryptPassword = {
  passwordHashed,
  passwordVerify,
};
