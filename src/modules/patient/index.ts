import { Router, Request, Response, NextFunction } from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from './patient.controller'; // Import controller functions


const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

router.get('/', getAllPatients);
router.get('/:hospitalNumber', getPatientById);
router.post('/', createPatient);
router.put('/:hospitalNumber', updatePatient);
router.delete('/:hospitalNumber', deletePatient);

// Apply the methodNotAllowed middleware to handle unsupported methods
router.all('*', methodNotAllowed);

export const patientRouter = router;
