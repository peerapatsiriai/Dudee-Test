import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';

const prisma = new PrismaClient();

// Get all patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

// Get a patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  const { hospitalNumber } = req.params;  
  try {
    const patient = await prisma.patient.findUnique({ where: { hospitalNumber } });
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
};

// Create a new patient
export const createPatient = async (req: Request, res: Response) => {
  const { hospitalNumber, firstName, lastName, birthday, sex } = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: {
        hospitalNumber,
        firstName,
        lastName,
        birthday: new Date(birthday),
        sex,
      },
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient' });
  }
};

// Update a patient by ID
export const updatePatient = async (req: Request, res: Response) => {
    const { hospitalNumber } = req.params;
    const { firstName, lastName, birthday, sex } = req.body;

    try {
      
      if (req.body.hospitalNumber != hospitalNumber) {
        throw new Error('hospitalNumber is required');
      }

      const patientToUpdate = await prisma.patient.findUnique({
        where: { hospitalNumber },
      });
  
      if (!patientToUpdate) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      const updatedPatient = await prisma.patient.update({
        where: { hospitalNumber },
        data: {
          firstName: firstName || patientToUpdate.firstName,
          lastName: lastName || patientToUpdate.lastName,
          birthday: birthday ? new Date(birthday) : patientToUpdate.birthday,
          sex: sex || patientToUpdate.sex,
        },
      });
  
      res.status(204).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update patient' });
    }
  };
  

// Delete a patient by ID
export const deletePatient = async (req: Request, res: Response) => {
  const { hospitalNumber } = req.params;
  try {
    await prisma.patient.delete({ where: { hospitalNumber } });
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};
