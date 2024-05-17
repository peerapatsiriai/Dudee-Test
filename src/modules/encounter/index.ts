import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllEncounters,
  getEncounterById,
  createEncounter,
  updateEncounter,
  deleteEncounter,
} from './encounter.controller'; // Import your controller functions

const router = Router();

// Middleware to handle unsupported methods
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    res.status(405).json({ error: 'Method Not Allowed' });
  };

router.get('/', getAllEncounters);
router.get('/:transactionNumber', getEncounterById);
router.post('/', createEncounter);
router.put('/:transactionNumber', updateEncounter);
router.delete('/:transactionNumber', deleteEncounter);

router.all('*', methodNotAllowed);

export const encounterRouter = router;

