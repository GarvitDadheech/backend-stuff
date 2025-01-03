import { mockDeep } from 'vitest-mock-extended';
import { PrismaClient } from "@prisma/client";
export const db = mockDeep<PrismaClient>();