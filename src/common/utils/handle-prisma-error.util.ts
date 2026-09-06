import { Prisma } from '@prisma/client';
import { PrismaErrorCode } from '../enums/prisma-error-code.enum.js';
import { NotFoundException } from '@nestjs/common';

export function handlePrismaError(
  error: unknown,
  entityName: string,
  id: string,
): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.ForeignKeyConstraintFailed:
        throw new NotFoundException(`${entityName} с ID "${id}" не найдена`);

      case PrismaErrorCode.RecordNotFound:
        throw new NotFoundException('Связанная запись не найдена');

      default:
        break;
    }
  }

  throw error;
}
