import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { createUserDto } from '../../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: createUserDto, metadata: ArgumentMetadata) {
    if (value.roles && value.roles instanceof Array && value.roles.length > 0) {
      // Roles[]
      if (value.roles[0]['id']) {
        value.roles = value.roles.map((item) => item.id);
      }
    }
    return value;
  }
}
