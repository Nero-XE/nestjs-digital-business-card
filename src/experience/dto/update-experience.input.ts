import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { ExperienceInput } from './experience.input.js';
import { Experience } from '@prisma/client';

@InputType({
  description: 'Входные данные для редактирования записи об опыте работы',
})
export class UpdateExperienceInput
  extends PartialType(ExperienceInput)
  implements Partial<Omit<Experience, 'createdAt' | 'updatedAt'>>
{
  @Field(() => ID, { description: 'ID записи (UUID v4)' })
  @IsUUID('4')
  id: string;
}
