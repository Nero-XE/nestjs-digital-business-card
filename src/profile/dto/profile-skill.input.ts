import { Field, InputType } from "@nestjs/graphql";
import { SkillLevel } from '../../common/enums/skill-level-enum.js';
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

@InputType({ description: 'Входные данные для навыка профиля' })
export class ProfileSkillInput implements PrismaJson.ProfileSkill {
  @Field(() => String, { description: 'Название' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => SkillLevel, { description: 'Уровень навыка' })
  @IsEnum(SkillLevel)
  level: SkillLevel;
}