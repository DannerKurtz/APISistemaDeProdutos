// Required bcrypt imports
import { compare, genSalt, hash } from 'bcrypt';

// Define the number of salt rounds
const SALT_RANDOMS = 8;

// Define the function that generates the salt and hashes the password
const passwordHashed = async (password: string) => {
  const saltGenerate = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerate);
};

// Define the function that compares the password with the hashed password
const passwordVerify = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

// Export both functions
export const bcryptPassword = {
  passwordHashed,
  passwordVerify,
};
