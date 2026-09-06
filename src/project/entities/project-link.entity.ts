import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Сущность ссылки в проекте',
})
export class ProjectLinkEntity implements PrismaJson.ProjectLink {
  @Field(() => String, {
    description: 'Название ссылки',
  })
  name: string;

  @Field(() => String, { description: 'URL-адрес' })
  url: string;
}
