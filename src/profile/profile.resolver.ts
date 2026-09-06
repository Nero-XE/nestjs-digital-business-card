import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { ProfileEntity } from './entities/profile.entity.js';
import { PaginationArgs } from '../common/args/pagination.args.js';
import { GetByIdArgs } from '../common/args/get-by-id.args.js';
import { ExperienceEntity } from '../experience/entities/experience.entity.js';
import { ExperienceService } from '../experience/experience.service.js';
import { ProjectService } from '../project/project.service.js';
import { ProjectEntity } from '../project/entities/project.entity.js';
import { CreateProfileInput } from './dto/create-profile.input.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';

@Resolver(() => ProfileEntity)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => [ProfileEntity], {
    description: 'Получение всех профилей',
  })
  async profiles(@Args() pagination: PaginationArgs): Promise<ProfileEntity[]> {
    return await this.profileService.findAll(pagination);
  }

  @Query(() => ProfileEntity, {
    description: 'Получение профиля по ID записи',
  })
  async profile(@Args() { id }: GetByIdArgs): Promise<ProfileEntity> {
    return await this.profileService.findOneById(id);
  }

  @ResolveField(() => [ExperienceEntity], {
    description: 'Список опыта работы профиля',
  })
  async experiences(
    @Parent() { id }: ProfileEntity,
  ): Promise<ExperienceEntity[]> {
    return await this.experienceService.findAllByProfileId(id);
  }

  @ResolveField(() => [ProjectEntity], {
    description: 'Список проектов профиля',
  })
  async projects(@Parent() { id }: ProfileEntity): Promise<ProjectEntity[]> {
    return await this.projectService.findAllByProfileId(id);
  }

  @Mutation(() => ProfileEntity, {
    description: 'Создание записи профиля',
  })
  async createProfile(
    @Args('data') input: CreateProfileInput,
  ): Promise<ProfileEntity> {
    return await this.profileService.create(input);
  }

  @Mutation(() => ProfileEntity, {
    description: 'Обновление записи профиля',
  })
  async updateProfile(
    @Args('data') input: UpdateProfileInput,
  ): Promise<ProfileEntity> {
    return await this.profileService.update(input);
  }

  @Mutation(() => ProfileEntity, {
    description: 'Удаление записи профиля',
  })
  async removeProfile(@Args() { id }: GetByIdArgs): Promise<ProfileEntity> {
    return await this.profileService.remove(id);
  }
}
