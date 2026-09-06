import { Project } from '@prisma/client';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectLinkEntity } from './project-link.entity.js';

@ObjectType({
  description: 'Сущность проекта',
})
export class ProjectEntity extends BaseEntity implements Project {
  @Field(() => ID, { description: 'ID профиля (UUID v4)' })
  profileId: string;

  @Field(() => String, { description: 'Название проекта' })
  name: string;

  @Field(() => String, { description: 'Описание проекта', nullable: true })
  description: string | null;

  @Field(() => [ProjectLinkEntity], {
    description: 'Список ссылок, связанных с проектом',
    defaultValue: [],
  })
  links: ProjectLinkEntity[];
}
