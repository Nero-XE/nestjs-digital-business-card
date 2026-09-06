import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginationArgs } from '../common/args/pagination.args.js';
import { ProfileEntity } from './entities/profile.entity.js';
import { CreateProfileInput } from './dto/create-profile.input.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
import { handlePrismaError } from '../common/utils/handle-prisma-error.util.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ offset, limit }: PaginationArgs): Promise<ProfileEntity[]> {
    return await this.prismaService.profile.findMany({
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  async findOneById(id: string): Promise<ProfileEntity> {
    const profile = await this.prismaService.profile.findUnique({
      where: { id },
    });

    if (!profile)
      throw new NotFoundException(`Запись о профиле с ID "${id}" не найдена`);

    return profile;
  }

  async create(input: CreateProfileInput): Promise<ProfileEntity> {
    return await this.prismaService.profile.create({
      data: input,
    });
  }

  async update({ id, ...data }: UpdateProfileInput): Promise<ProfileEntity> {
    try {
      return await this.prismaService.profile.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError(error, 'Запись профиля', id);
    }
  }

  async remove(id: string): Promise<ProfileEntity> {
    try {
      return await this.prismaService.profile.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(error, 'Запись профиля', id);
    }
  }
}
