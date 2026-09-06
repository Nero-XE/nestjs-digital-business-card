import { Field, ID, InputType, OmitType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { ExperienceInput } from './experience.input.js';
import { Experience } from '@prisma/client';
import { CreateProfileChildInputKeys } from '../../common/types/input-keys.type.js';

@InputType({
  description: 'Входные данные для создания записи об опыте работы',
})
export class CreateExperienceInput
  extends ExperienceInput
  implements CreateProfileChildInputKeys<Experience>
{
  @Field(() => ID, { description: 'ID профиля (UUID v4)' })
  @IsUUID('4')
  profileId: string;
}
