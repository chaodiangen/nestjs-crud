// Copyright (c) 2022 toimc<admin@wayearn.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import { Logger } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getServerConfig } from 'ormconfig';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception.filter';

const config = getServerConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs日志
    logger: false,
    // 允许跨域
    cors: true,
    // logger: ['error', 'warn'],
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api/v1');
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  // 配置全局拦截器 管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除类上不存在字段
      whitelist: true,
    }),
  );
  // 弊端 无法使用DI
  // app.useGlobalGuards()
  const port =
    typeof config['APP_PORT'] === 'string'
      ? parseInt(config['APP_PORT'])
      : 3000;
  await app.listen(port);
}
bootstrap();
