import { Profile } from '@prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { ProfileLinkInput } from './profile-link.input.js';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ProfileSkillInput } from './profile-skill.input.js';
import { CreateInputKeys } from '../../common/types/input-keys.type.js';

@InputType({ description: 'Входные данные для создания профиля' })
export class CreateProfileInput implements CreateInputKeys<Profile> {
  @Field(() => String, { description: 'ФИО' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field(() => String, { description: 'Описание', nullable: true })
  @IsString()
  @IsOptional()
  description: string | null;

  @Field(() => [ProfileLinkInput], {
    description: 'Список профессиональных ресурсов',
    defaultValue: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileLinkInput)
  links: ProfileLinkInput[];

  @Field(() => [ProfileSkillInput], {
    description: 'Список навыков',
    defaultValue: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileSkillInput)
  skills: ProfileSkillInput[];
}
