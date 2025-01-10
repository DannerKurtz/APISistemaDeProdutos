// Necessary imports
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ISalesWithoutId } from '../../database/models/SalesInterface';
import { saleProvider } from '../../database/providers/SaleProvider';

// Definition of the params interface
interface IParams {
  id: string;
}

// Export of the function responsible for the PUT method
export const update = async (
  req: Request<IParams, {}, ISalesWithoutId>,
  res: Response
): Promise<any> => {
  // Destructuring the id from params and the body from the request
  const { id } = req.params;
  const { body } = req;

  //  Calling the provider that updates the sale or returns an error
  const updateSale = await saleProvider.update(id, body);

  // Validation: if it's an error, return the message
  if (updateSale instanceof Error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: updateSale.message });

  // Return the updated sale
  return res.status(StatusCodes.OK).json({ saleUpdated: updateSale });
};
