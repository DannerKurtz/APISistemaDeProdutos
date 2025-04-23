import { Request, Response } from 'express';
import { ICompanyWithoutId } from '../../database/models/CompanyInterface';
import { companyProvider } from '../../database/providers/CompanyProvider';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';

export const create = async (
  req: Request<{}, {}, ICompanyWithoutId>,
  res: Response
): Promise<any> => {
  const newCompany = await companyProvider.create(req.body);

  if (newCompany instanceof Error)
    return res.status(StatusCodes.CONFLICT).json({ error: newCompany.message });

  return res.status(StatusCodes.CREATED).json({ companyCreated: newCompany });
};
