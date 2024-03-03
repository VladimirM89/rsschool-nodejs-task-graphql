import { PrismaClient } from '@prisma/client';

export interface Context {
  query: string;
  prisma1: PrismaClient;
}