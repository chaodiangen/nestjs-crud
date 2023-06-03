import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getServerConfig } from '../ormconfig';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const setupApp = (app: INestApplication) => {
  const config = getServerConfig();

  const flag: boolean = config['LOG_ON'] === 'true';
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  flag && app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix('api/v1');

  // const httpAdapter = app.get(HttpAdapterHost);
  // // 全局Filter只能有一个
  // const logger = new Logger();
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  // 全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的字段
      whitelist: true,
    }),
  );

  // app.useGlobalGuards()
  // 弊端 -> 无法使用DI -> 无法访问userService

  // app.useGlobalInterceptors(new SerializeInterceptor());

  // helmet头部安全
  app.use(helmet());

  // rateLimit限流
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 300, // limit each IP to 100 requests per windowMs
    }),
  );
};
