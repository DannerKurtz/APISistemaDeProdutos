// Necessary imports
import { prisma } from '../../../../database/prisma';
import { bcryptPassword } from '../../bcrypt';

// Defines a generic type omitting the ID and optionally allowing a name or password property
type TWithoutId<T> = Omit<T, 'id'> &
  Partial<{ name?: string; password?: string }>;

// Exports the function responsible for interacting with the database and creating a new record
export const createInDatabase = async <T>(
  data: TWithoutId<T>,
  modelName: string,
  message: string
): Promise<Error | T> => {
  try {
    // If data contains a name, checks if it is already in use
    if (data.name) {
      const nameUserVerify = await (prisma as any)[modelName].findFirst({
        where: { name: data.name },
      });
      if (nameUserVerify) return new Error('The name already exists');
    }
    // Validates if data contains a password; if so, encrypts it using the bcrypt function
    if (data.password) {
      const passwordCrypto = await bcryptPassword.passwordHashed(data.password);
      data.password = passwordCrypto;
    }

    // Calls Prisma with the provided modelName (table name) to create a new record
    const createNewData = await (prisma as any)[modelName].create({
      data,
    });

    // Returns the newly created record
    return createNewData;
  } catch (error) {
    console.log('catch CRUD service', error);
    // Returns the error in case of an exception
    return new Error(message);
  }
};
