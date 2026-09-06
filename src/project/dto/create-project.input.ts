import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { ProjectInput } from './project.input.js';
import { Project } from '@prisma/client';
import { CreateProfileChildInputKeys } from '../../common/types/input-keys.type.js';

@InputType({
  description: 'Входные данные для создания записи проекта',
})
export class CreateProjectInput
  extends ProjectInput
  implements CreateProfileChildInputKeys<Project>
{
  @Field(() => ID, { description: 'ID профиля (UUID v4)' })
  @IsUUID('4')
  profileId: string;
}
