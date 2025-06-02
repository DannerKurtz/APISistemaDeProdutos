// Importing Request and Response from express, as well as StatusCodes, functions, and interfaces
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { companyProvider } from '../../database/providers/CompanyProvider';
import { ICompany } from '../../database/models/CompanyInterface';

// Declaring the query interface
interface IQuery {
  id?: string;
  name?: string;
}

// Exporting the function to fetch company
export const get = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response
): Promise<any> => {
  // Destructuring query from the request
  const { query } = req;

  // Fetches company, returning a list of ICompany or an erro
  const getCompany: ICompany | Error = await companyProvider.get(query);

  // Validating if getCompany is an instance of an error, and if so, returning an error immediately
  if (getCompany instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getCompany.message });
  }

  // Returning company if everything is successful
  return res.status(StatusCodes.OK).json({ customerListed: getCompany });
};
