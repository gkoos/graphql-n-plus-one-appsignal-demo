import { prisma } from "../prismaClient.js";

export const context = {
  db: prisma
};
