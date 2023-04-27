import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('拦截器执行之前');
    // const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        // console.log('拦截器执行之后', data);
        return plainToInstance(this.dto, data, {
          // 设置为true 所有经过该interceptor的接口的数据需要设置Expose或Exclude
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
