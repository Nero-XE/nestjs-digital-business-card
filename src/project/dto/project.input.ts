import { Field, InputType } from '@nestjs/graphql';
import { Project } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProjectLinkInput } from './project-link.input.js';
import { Type } from 'class-transformer';
import { ProfileChildBaseInputKeys } from '../../common/types/input-keys.type.js';

@InputType({
    description: 'Базовые входные данные для создания записи о проекте',
    isAbstract: true,
})
export class ProjectInput implements ProfileChildBaseInputKeys<Project> {
  @Field(() => String, { description: 'Название проекта' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'Описание проекта', nullable: true })
  @IsString()
  @IsOptional()
  description: string | null;

  @Field(() => [ProjectLinkInput], {
    description: 'Список ссылок, связанных с проектом',
    defaultValue: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectLinkInput)
  links: ProjectLinkInput[];
}
