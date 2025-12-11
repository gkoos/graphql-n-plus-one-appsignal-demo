import { prisma } from "../prismaClient.js";
import { createLoaders } from "./loaders.js";

export function getContext() {
  return {
    db: prisma,
    loaders: createLoaders(prisma)
  };
}
