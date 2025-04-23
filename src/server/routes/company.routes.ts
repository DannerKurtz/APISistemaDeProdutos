import { Router } from 'express';
import { companyController } from '../controllers/CompanyController';

export const companyRouter = (router: Router) => {
  router.post('/api/company', companyController.create); // POST route for creating companies
  // router.get('/api/company', companyController.get); // GET route for fetching companies
  // router.put('/api/company/:id', companyController.update); // PUT route for updating companies
  // router.delete('/api/company/:id', companyController.deleteCompany); // DELETE route for deleting a company
};
