import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { ExperienceInput } from './experience.input.js';
import { Experience } from '@prisma/client';
import { UpdateInputKeys } from '../../common/types/input-keys.type.js';

@InputType({
  description: 'Входные данные для редактирования записи об опыте работы',
})
export class UpdateExperienceInput
  extends PartialType(ExperienceInput)
  implements UpdateInputKeys<Experience>
{
  @Field(() => ID, { description: 'ID записи (UUID v4)' })
  @IsUUID('4')
  id: string;
}
