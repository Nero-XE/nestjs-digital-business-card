import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { ProjectInput } from './project.input.js';
import { Project } from '@prisma/client';
import { UpdateInputKeys } from '../../common/types/input-keys.type.js';

@InputType({
  description: 'Входные данные для редактирования записи о проекте',
})
export class UpdateProjectInput
  extends PartialType(ProjectInput)
  implements UpdateInputKeys<Project>
{
  @Field(() => ID, { description: 'ID записи (UUID v4)' })
  @IsUUID('4')
  id: string;
}
