import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

@InputType({ description: 'Входные данные для профессиональных ресурсов' })
export class ProfileLinkInput implements PrismaJson.ProfileLink {
  @Field(() => String, { description: 'Название платформы' })
  @IsString()
  @IsNotEmpty()
  platform: string;

  @Field(() => String, { description: 'Ссылка на ресурс' })
  @IsUrl()
  url: string;
}