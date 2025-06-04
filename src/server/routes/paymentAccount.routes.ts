import { Router } from 'express';
import { paymentAccountController } from '../controllers/PaymentAccountController';

export const paymentAccountRoute = (router: Router) => {
  router.post('/api/payment-account', paymentAccountController.create);
  router.get('/api/payment-account', paymentAccountController.get);
  router.put('/api/payment-account/:id', paymentAccountController.update);
  router.delete(
    '/api/payment-account/:id',
    paymentAccountController.deletePaymentAccount
  );
};
