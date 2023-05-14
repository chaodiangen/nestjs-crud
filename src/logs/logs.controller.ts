import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

class LogsDto {
  @IsString()
  msg: string;

  @IsString()
  id: string;
}

class PubLicLogsDto {
  @Expose()
  msg: string;
}

@Controller('logs')
@UseGuards(JwtGuard, AdminGuard)
export class LogsController {
  @Get()
  getTest() {
    return 'test';
  }

  @Post()
  // 后置拦截器，Expose 隐藏导出字段
  // @UseInterceptors(new SerializeInterceptor(PubLicLogsDto))
  @Serialize(PubLicLogsDto)
  postTest(@Body() dto: LogsDto) {
    return dto;
  }
}
