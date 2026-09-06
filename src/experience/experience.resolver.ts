import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExperienceService } from './experience.service.js';
import { ExperienceEntity } from './entities/experience.entity.js';
import { GetByIdArgs } from '../common/args/get-by-id.args.js';
import { CreateExperienceInput } from './dto/create-experience.input.js';
import { UpdateExperienceInput } from './dto/update-experience.input.js';
import { PaginationArgs } from '../common/args/pagination.args.js';

@Resolver(() => ExperienceEntity)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [ExperienceEntity], {
    description: 'Получение всех мест работы',
  })
  async experiences(
    @Args() pagination: PaginationArgs,
  ): Promise<ExperienceEntity[]> {
    return await this.experienceService.findAll(pagination);
  }

  @Query(() => ExperienceEntity, {
    description: 'Получение места работы по ID записи',
  })
  async experience(@Args() { id }: GetByIdArgs): Promise<ExperienceEntity> {
    return await this.experienceService.findOneById(id);
  }

  @Mutation(() => ExperienceEntity, {
    description: 'Создание записи опыта работы',
  })
  async createExperience(
    @Args('data') input: CreateExperienceInput,
  ): Promise<ExperienceEntity> {
    return await this.experienceService.create(input);
  }

  @Mutation(() => ExperienceEntity, {
    description: 'Обновление записи опыта работы',
  })
  async updateExperience(
    @Args('data') input: UpdateExperienceInput,
  ): Promise<ExperienceEntity> {
    return await this.experienceService.update(input);
  }

  @Mutation(() => ExperienceEntity, {
    description: 'Удаление записи опыта работы',
  })
  async removeExperience(
    @Args() { id }: GetByIdArgs,
  ): Promise<ExperienceEntity> {
    return await this.experienceService.remove(id);
  }
}
