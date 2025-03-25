import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
   @Param value = Query Object or Body object or Params Value 
   @example  PaginationQueryDto { page:1, limit=12 } 
   @Param medatdata = object contains these properties :
   @property  type = 'body' | 'query' | 'param' | 'custom'
   @property  metatype?: Type<unknown> 
   @property  data?: string
  
   @returns value = if we don't return anything from transform method then the query/body/params will be undefined in the controller method , so it's mandatory to return transformed value .

  @description PipeTransform<T, R> is a generic interface that must be implemented by any pipe. The generic interface uses T to indicate the type of the input value, and R to indicate the return type of the transform() method.
  
**/

@Injectable()
export class LogTypePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 'log pipe value');
    console.log(metadata, 'log pipe metadata');
    return value;
  }
}
