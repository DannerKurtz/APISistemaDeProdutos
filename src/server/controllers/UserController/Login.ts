import { StatusCodes } from 'http-status-codes';
import { IUsersWithoutId } from '../../database/models/UsersInterface';
import { userProvider } from '../../database/providers/UserProvider';
import { bcryptPassword } from '../../shared/services/bcrypt';
import { JWTService } from '../../shared/services/JWTService';
import { Request, Response } from 'express';

export const Login = async (
  req: Request<IUsersWithoutId>,
  res: Response
): Promise<any> => {
  const { name, password } = req.body;

  // 1. Busca usuários (agora tratando como array)
  const users = await userProvider.get({ name });
  if (users instanceof Error || !Array.isArray(users) || users.length === 0) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Credenciais inválidas' },
    });
  }

  // 2. Validação da senha
  const user = users[0];
  const isPasswordValid = await bcryptPassword.passwordVerify(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Credenciais inválidas' },
    });
  }

  // 3. Gera token
  const accessToken = JWTService.sign({ uid: user.id });
  if (accessToken === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Erro ao gerar token' },
    });
  }

  return res.status(StatusCodes.OK).json({ userLoggedIn: accessToken });
};
