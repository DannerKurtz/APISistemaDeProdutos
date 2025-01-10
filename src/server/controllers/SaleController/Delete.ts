// Necessary imports
import { Request, Response } from 'express';
import { saleProvider } from '../../database/providers/SaleProvider';
import { StatusCodes } from 'http-status-codes';

// Definition of the params interface
interface IParams {
  id: string;
}

// Exporting the function responsible for the DELETE method
export const deleteSale = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  // Destructuring the id from the params
  const { id } = req.params;

  // Calling the provider that deletes or returns an error
  const deleteSale: Boolean | Error = await saleProvider.deleteSale(id);

  // Validating if it's an error and returning the message
  if (deleteSale instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: deleteSale.message });

  //  Returning if it was deleted
  return res.status(StatusCodes.OK).json({ saleDeleted: deleteSale });
};
