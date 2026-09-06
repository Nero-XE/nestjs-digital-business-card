import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType({
  description: 'Входные данные для создания ссылки в проекте',
})
export class ProjectLinkInput implements PrismaJson.ProjectLink {
  @Field(() => String, {
    description: 'Название ссылки',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'URL-адрес' })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
