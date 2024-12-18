import { Request, Response } from 'express';
import { clientsProvider } from '../../database/providers/CustomerProvider';
import { StatusCodes } from 'http-status-codes';

interface IParams {
  id: string;
}
export const deleteCustomer = async (
  req: Request<IParams>,
  res: Response
): Promise<any> => {
  const id: string = req.params.id;
  const deletedCustomer: Boolean | Error = await clientsProvider.deleteClient(
    id
  );

  if (deletedCustomer instanceof Error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: deletedCustomer.message });
  }

  return res.status(StatusCodes.OK).json({ customerDeleted: deletedCustomer });
};
