import { PrismaClient } from "@prisma/client";

// ขอเอา Repo ไปรวมในกับ Business logic ใน Controller นะครับ

export const db = new PrismaClient()

