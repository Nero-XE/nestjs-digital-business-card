import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExperienceEntity } from './entities/experience.entity.js';
import { CreateExperienceInput } from './dto/create-experience.input.js';
import { UpdateExperienceInput } from './dto/update-experience.input.js';
import { PaginationArgs } from '../common/args/pagination.args.js';
import { handlePrismaError } from '../common/utils/handle-prisma-error.util.js';

@Injectable()
export class ExperienceService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    offset,
    limit,
  }: PaginationArgs): Promise<ExperienceEntity[]> {
    return await this.prismaService.experience.findMany({
      orderBy: { startedAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  async findOneById(id: string): Promise<ExperienceEntity> {
    const experience = await this.prismaService.experience.findUnique({
      where: { id },
    });

    if (!experience)
      throw new NotFoundException(
        `Запись об опыте работы с ID "${id}" не найдена`,
      );

    return experience;
  }

  async create(input: CreateExperienceInput): Promise<ExperienceEntity> {
    try {
      return await this.prismaService.experience.create({
        data: input,
      });
    } catch (error) {
      handlePrismaError(error, 'Запись профиля', input.profileId);
    }
  }

  async update({
    id,
    ...data
  }: UpdateExperienceInput): Promise<ExperienceEntity> {
    try {
      return await this.prismaService.experience.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError(error, 'Запись опыта работы', id);
    }
  }

  async remove(id: string): Promise<ExperienceEntity> {
    try {
      return await this.prismaService.experience.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(error, 'Запись опыта работы', id);
    }
  }

  async findAllByProfileId(profileId: string): Promise<ExperienceEntity[]> {
    return await this.prismaService.experience.findMany({
      where: { profileId },
      orderBy: { startedAt: 'desc' }
    });
  }
}
