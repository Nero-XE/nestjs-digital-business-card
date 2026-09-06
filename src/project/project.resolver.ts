import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service.js';
import { ProjectEntity } from './entities/project.entity.js';
import { PaginationArgs } from '../common/args/pagination.args.js';
import { GetByIdArgs } from '../common/args/get-by-id.args.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';

@Resolver(() => ProjectEntity)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectEntity], {
    description: 'Получение всех проектов',
  })
  async projects(
    @Args() pagination: PaginationArgs,
  ): Promise<ProjectEntity[]> {
    return await this.projectService.findAll(pagination);
  }

  @Query(() => ProjectEntity, {
    description: 'Получение проекта по ID записи',
  })
  async project(@Args() { id }: GetByIdArgs): Promise<ProjectEntity> {
    return await this.projectService.findOneById(id);
  }

  @Mutation(() => ProjectEntity, {
    description: 'Создание записи проекта',
  })
  async createProject(
    @Args('data') input: CreateProjectInput,
  ): Promise<ProjectEntity> {
    return await this.projectService.create(input);
  }

  @Mutation(() => ProjectEntity, {
    description: 'Обновление записи проекта',
  })
  async updateProject(
    @Args('data') input: UpdateProjectInput,
  ): Promise<ProjectEntity> {
    return await this.projectService.update(input);
  }

  @Mutation(() => ProjectEntity, {
    description: 'Удаление записи проекта',
  })
  async removeProject(
    @Args() { id }: GetByIdArgs,
  ): Promise<ProjectEntity> {
    return await this.projectService.remove(id);
  }
}
