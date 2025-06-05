// Importing Request and Response from express, the provider, and StatusCode
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { companyProvider } from '../../database/providers/CompanyProvider';

// Definition of the interface for parameters
interface IParams {
  id: string;
}

// Exporting the function responsible for the DELETE method
export const deletedCompany = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Extracting the id from the request parameters
  const { id } = req.params;

  // Calls the provider to delete the company, returning a boolean or an error
  const deletedCompany: Boolean | Error = await companyProvider.deletedCompany(
    id
  );

  // Verifying if deletedCompany is an instance of an error, if so, it throws an error
  if (deletedCompany instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: deletedCompany.message });
  }

  // Returning if the customer is deleted
  return res.status(StatusCodes.OK).json({ companyDeleted: deletedCompany });
};
