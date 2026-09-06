import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Сущность профессионального ресурса' })
export class ProfileLinkEntity implements PrismaJson.ProfileLink {
  @Field(() => String, { description: 'Название ресурса' })
  platform: string;

  @Field(() => String, { description: 'Ссылка на ресурс' })
  url: string;
}
