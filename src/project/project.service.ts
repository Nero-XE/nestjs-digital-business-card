import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProjectEntity } from './entities/project.entity.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';
import { PaginationArgs } from '../common/args/pagination.args.js';
import { handlePrismaError } from '../common/utils/handle-prisma-error.util.js';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ offset, limit }: PaginationArgs): Promise<ProjectEntity[]> {
    return await this.prismaService.project.findMany({
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  async findOneById(id: string): Promise<ProjectEntity> {
    const project = await this.prismaService.project.findUnique({
      where: { id },
    });

    if (!project)
      throw new NotFoundException(`Запись о проекте с ID "${id}" не найдена`);

    return project;
  }

  async create(input: CreateProjectInput): Promise<ProjectEntity> {
    try {
      return await this.prismaService.project.create({
        data: input,
      });
    } catch (error) {
      handlePrismaError(error, 'Запись профиля', input.profileId);
    }
  }

  async update({ id, ...data }: UpdateProjectInput): Promise<ProjectEntity> {
    try {
      return await this.prismaService.project.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError(error, 'Запись проекта', id);
    }
  }

  async remove(id: string): Promise<ProjectEntity> {
    try {
      return await this.prismaService.project.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(error, 'Запись проекта', id);
    }
  }

  async findAllByProfileId(profileId: string): Promise<ProjectEntity[]> {
    return await this.prismaService.project.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
