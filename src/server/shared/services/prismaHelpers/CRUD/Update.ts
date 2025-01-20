// Necessary imports
import { prisma } from '../../../../database/prisma';
import { bcryptPassword } from '../../bcrypt';

// Creates a generic type without the id and adds name, password, and newPassword as partial fields
type withoutId<T> = Omit<T, 'id'> &
  Partial<{ name?: string; password?: string; newPassword?: string }>;

// Exports the function responsible for updating the record
export const updateInDatabase = async <T>(
  params: string,
  data: withoutId<T>,
  modelName: string,
  message: string
) => {
  try {
    // Calls prisma and checks if data with this id exists, returns a message if not found
    const dataExist = await (prisma as any)[modelName].findFirst({
      where: { id: params },
    });
    if (!dataExist) {
      return new Error('ID not exists');
    }

    // Validates if the data has a password, checks if the provided password matches the stored password
    // If correct, allows saving the new password
    if (data.password) {
      const passwordVerify = await bcryptPassword.passwordVerify(
        data.password,
        dataExist.password
      );
      if (!passwordVerify) {
        return new Error('Password or Name User incorrect ');
      }

      if (data.newPassword) {
        const passwordHash = await bcryptPassword.passwordHashed(
          data.newPassword
        );
        data.password = passwordHash;
      }
    }

    // Destructure the data removing newPassword
    const { newPassword, ...dataWithoutNewPassword } = data;

    // Returns the prisma call updating the data
    return await (prisma as any)[modelName].update({
      where: { id: params },
      data: {
        ...dataWithoutNewPassword,
      },
    });
  } catch (error) {
    // Returns the error in case of an exception
    return new Error(message);
  }
};
