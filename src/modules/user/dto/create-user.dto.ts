export class CreateUserDto {
  email: string;
  name?: string | null;
  password: string;
  score: number;
  role?: Role;
  reviews?: ReviewCreateNestedManyWithoutAuthorInput;
  comments?: CommentCreateNestedManyWithoutAuthorInput;
  profile?: ProfileCreateNestedOneWithoutUserInput;
}
