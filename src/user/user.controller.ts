import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Inject,
  LoggerService,
  Body,
  Param,
  Req,
  Query,
  UseFilters,
  Headers,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './dto/get-user.dto';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { CreateUserPipe } from './pipes/create-user/create-user.pipe';
import { createUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/admin.guard';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseFilters(new TypeormFilter())
// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtGuard)
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init');
  }

  @Get()
  @UseGuards(AdminGuard)
  getUsers(@Query() query: getUserDto): any {
    // page limit condition-查询条件
    // 前端传过来的query参数全部是string
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body(CreateUserPipe) dto: createUserDto): any {
    // todo 解析Body参数
    const user = dto as User;
    return this.userService.create(user);
  }
  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id') id: number,
    @Headers('Authonrization') headers: any,
  ): any {
    // todo 传递参数id
    // todo 异常处理
    // 权限1：判断用户是否是自己
    // 权限1：判断用户是否有更新user的权限
    // 权限1：不能包含敏感的password信息
    if (id === headers) {
      // 同一个用户修改，允许修改 否则不可以
      const user = dto as User;
      return this.userService.update(id, user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number): any {
    // todo 传递参数id
    // 权限1：判断用户是否是自己
    // 权限1：判断用户是否有更新user的权限
    return this.userService.remove(id);
  }

  @Get('/profile')
  // import
  // 1. 装饰器的执行顺序，方法的装饰器有多个，则从下往上执行
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // 2. 如果使用UseGuards传递多个守卫，前面的guard没有执行结束，后面的不会执行
  getUserProfile(@Query('id', ParseIntPipe) query: any): any {
    return this.userService.findProfile(query);
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }
}
