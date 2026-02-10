import { PrismaClient } from '@prisma/client';

// create a prisma client to work with the database
// import it wherever task operations are needed
export const prisma = new PrismaClient();
