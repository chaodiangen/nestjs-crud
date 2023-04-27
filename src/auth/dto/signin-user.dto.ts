import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsString({
    message: '用户名类型不正确',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Length(6, 20, {
    message:
      '用户的长度必须在$constraint1到$constraint2之间，当前传递值是：$value',
  })
  username: string;

  @IsString({
    message: '密码类型不正确',
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @Length(6, 30, {
    message:
      '密码的长度必须在$constraint1到$constraint2之间，当前传递值是：$value',
  })
  password: string;
}
