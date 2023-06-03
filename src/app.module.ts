import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

import { connectionParams } from '../ormconfig';
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';
import { AuthModule } from './auth/auth.module';

// import { AdminGuard } from './guards/admin.guard';
// import { APP_GUARD } from '@nestjs/core';

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DB_PORT: Joi.number().default(3306),
  DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
  DB_TYPE: Joi.string().valid('mysql', 'postgres'),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  LOG_ON: Joi.boolean(),
  LOG_LEVEL: Joi.string(),
});

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      // https://github.com/nestjs/config/issues/209#issuecomment-625765057
      // load方法需要自己加入验证
      // 解决方法：https://dev.to/rrgt19/ways-to-validate-environment-configuration-in-a-forfeature-config-in-nestjs-2ehp
      load: [
        () => {
          const values = dotenv.config({ path: '.env' });
          const { error } = schema.validate(values?.parsed, {
            // 允许未知的环境变量
            allowUnknown: true,
            // 如果有错误，不要立即停止，而是收集所有错误
            abortEarly: false,
          });
          if (error) {
            throw new Error(
              `Validation failed - Is there an environment variable missing?
        ${error.message}`,
            );
          }
          return values;
        },
      ],
      validationSchema: schema,
    }),
    TypeOrmModule.forRoot(connectionParams),
    UserModule,
    LogsModule,
    RolesModule,
    AuthModule,
    MenusModule,
  ],
  controllers: [],
  providers: [
    Logger,
    // {
    //   provide: APP_GUARD,
    //   useClass: AdminGuard,
    // },
  ],
  exports: [Logger],
})
export class AppModule {}
