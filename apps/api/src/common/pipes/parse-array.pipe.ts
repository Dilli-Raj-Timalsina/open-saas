import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseArrayPipe implements PipeTransform<string, string[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _metadata: ArgumentMetadata): string[] {
    const parsedArray = value.split(',').map((item) => item.trim());

    return parsedArray;
  }
}
