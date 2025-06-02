// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  ICompany,
  ICompanyWithoutId,
} from '../../database/models/CompanyInterface';
import { companyProvider } from '../../database/providers/CompanyProvider';

// Definition of the parameters interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, ICompanyWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from request params and the body from request
  const { id } = req.params;
  const { body } = req;

  // Calls the provider to update the company, returning the updated company or an error
  const updatedCompany: ICompany | Error = await companyProvider.update(
    id,
    body
  );

  // Validating if updatedCompany is an instance of an error, if so, it returns the error
  if (updatedCompany instanceof Error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updatedCompany.message });
  }

  // Returning the updated company
  return res.status(StatusCodes.OK).json({
    companyUpdated: updatedCompany,
  });
};
