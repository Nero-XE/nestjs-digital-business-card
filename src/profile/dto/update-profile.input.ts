import { Profile } from '@prisma/client';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { CreateProfileInput } from './create-profile.input.js';
import { UpdateInputKeys } from '../../common/types/input-keys.type.js';
import { ProfileLinkInput } from './profile-link.input.js';
import { Type } from 'class-transformer';
import { ProfileSkillInput } from './profile-skill.input.js';

@InputType({ description: 'Входные данные для редактирования профиля' })
export class UpdateProfileInput
  extends PartialType(CreateProfileInput, { omitDefaultValues: true })
  implements UpdateInputKeys<Profile>
{
  @Field(() => ID, { description: 'ID записи (UUID v4)' })
  @IsUUID('4')
  id: string;

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
