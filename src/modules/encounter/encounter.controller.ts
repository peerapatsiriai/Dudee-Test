import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all encounters
export const getAllEncounters = async (req: Request, res: Response) => {
  try {
    const encounters = await prisma.encounter.findMany();
    res.json(encounters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch encounters' });
  }
};

// Get a encounter by ID
export const getEncounterById = async (req: Request, res: Response) => {
  const { transactionNumber } = req.params;
  try {

    const encounter = await prisma.encounter.findUnique({
      where: { transactionNumber },
      include: {
        patient: {
          select: {
            hospitalNumber: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!encounter) {
      res.status(404).json({ error: 'Encounter not found' });
    } else {
      res.json(encounter);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch encounter' });
  }
};

// Create a new encounter
export const createEncounter = async (req: Request, res: Response) => {
  const { transactionNumber, visitDate, physicalExamination, diagnosis, presentIllness, patientHospitalNumber } = req.body;
  try {
    const newEncounter = await prisma.encounter.create({
      data: {
        transactionNumber,
        visitDate: new Date(visitDate),
        physicalExamination,
        diagnosis,
        presentIllness,
        patientHospitalNumber,
      },
    });
    res.status(201).json(newEncounter);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create encounter' });
  }
};

// Update an encounter by ID
export const updateEncounter = async (req: Request, res: Response) => {
  const { transactionNumber } = req.params;
  const { visitDate, physicalExamination, diagnosis, presentIllness, patientHospitalNumber } = req.body;
  let updateManyValue = true;

  try {
    // อันนี้ไม่ค่อยเขาใจระหว่างโจทย์ใน README กับ Test case should return 204 for update encounter
    // ใน README เหมือนให้ Binding ทุกตัวในระหว่าง body กับ model แล้ว Update
    // กับใน Test case เหมือนให้รับแค่ diagnosis อันเดียวแล้ว Update
    // ผมเลยสร้างการ Update มาสองรูปแบบ แบบหลายตัว กับ แบบตัวเดี่ยวนะครับ
    if (!(visitDate || physicalExamination || presentIllness || patientHospitalNumber ) && (diagnosis)) {
      updateManyValue = false; //ถ้ามีแค่ diagnosis เปลี่ยนไป Update อีกเดี่ยว
    }
    
    const encounterToUpdate = await prisma.encounter.findUnique({
      where: { transactionNumber },
    });
 
    if (!encounterToUpdate) {
      return res.status(404).json({ error: 'Encounter not found' });
    } 

    if(updateManyValue) {
      
      if (req.body.transactionNumber != transactionNumber) {
        throw new Error('TransactionNumber not equal');
      }

      await prisma.encounter.update({
        where: { transactionNumber },
        data: {
          visitDate: new Date(visitDate),
          physicalExamination: physicalExamination || encounterToUpdate.physicalExamination,
          diagnosis: diagnosis || encounterToUpdate.diagnosis,
          patientHospitalNumber: patientHospitalNumber || encounterToUpdate.patientHospitalNumber,
          presentIllness: presentIllness || encounterToUpdate.presentIllness,
        }
      });

    } else {
      await prisma.encounter.update({
        where: { transactionNumber },
        data: {
          diagnosis: diagnosis || encounterToUpdate.diagnosis,
        }
      });
    }

    res.status(204).json("Update Success")  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update encounter' });
  }
};

// Delete an encounter by ID
export const deleteEncounter = async (req: Request, res: Response) => {
  const { transactionNumber } = req.params;
  try {
    await prisma.encounter.delete({ where: { transactionNumber } });
    res.json({ message: 'Encounter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete encounter' });
  }
};
