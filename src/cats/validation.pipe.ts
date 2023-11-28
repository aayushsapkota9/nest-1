// import {
//   PipeTransform,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';
// import { ZodObject } from 'zod';

// export class ZodValidationPipe implements PipeTransform {
//   constructor(private schema: ZodObject<any>) {}

//   transform(value: unknown, metadata: ArgumentMetadata) {
//     try {
//       this.schema.parse(value);
//     } catch (error) {
//       throw new BadRequestException('Validation failed');
//     }
//     return value;
//   }
// }
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
