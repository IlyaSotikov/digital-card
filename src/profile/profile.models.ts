import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => ID)
  id!: string;

  @Field()
  label!: string;

  @Field()
  url!: string;
}

@ObjectType()
export class Skill {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ description: 'Группа навыка для витрины' })
  group!: string;
}

@ObjectType()
export class Experience {
  @Field(() => ID)
  id!: string;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field()
  period!: string;

  @Field(() => [String])
  achievements!: string[];
}

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  url?: string | null;

  @Field()
  summary!: string;
}

@ObjectType()
export class Profile {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  location?: string | null;

  @Field({ nullable: true })
  email?: string | null;

  @Field({ nullable: true })
  phone?: string | null;

  @Field(() => [Link])
  links!: Link[];

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Experience])
  experience!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
