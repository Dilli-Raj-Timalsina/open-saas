/**
  @Topic interceptor An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.

 Interceptors have following capabilities :

 - bind extra logic before / after method execution
 - transform the result returned from a function
 - transform the exception thrown from a function
 - extend the basic function behavior
 - completely override a function depending on specific conditions (e.g., for caching purposes)
  
  @param context :  By extending ArgumentsHost, ExecutionContext also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic interceptors that can work across a broad set of controllers, methods, and execution contexts .

  @param next :  The second argument is a CallHandler. The CallHandler interface implements the handle() method, which you can use to invoke the route handler method at some point in your interceptor. If you don't call the handle() method in your implementation of the intercept() method, the route handler method won't be executed at all.

   you can perform certain tasks before you let the main function execute by placing your code in the intercept() method. Then, after the main function has been executed (indicated by calling handle()), you can further modify or process the result using special techniques provided by RxJS, a powerful library for handling asynchronous operations.



  @Binding 
  In order to set up the interceptor, we use the @UseInterceptors() decorator imported from the @nestjs/common package.
  e.g @UseInterceptors(LoggingInterceptor)
   export class CatsController {}


 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map, of } from 'rxjs';

@Injectable()
export class DefinationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /* of is an rxjs operator which returns static values as a stream observable , it is useful when we want to completely override method handler or we don't want the method handler to be execute . */
    return of(['ram', 'shyam', 'hari']);

    //if we don't want to intercept in between , just pass the execution to method handler .
    return next.handle();

    /* if we mant to transform the responce return from the method handler or bind extra logic or responce mapping .This maps the responce returned from the metho handler to data object and return the data object as a responce . e.g
    if method handler would have returned  { status : 'success' , name : 'ram' } then this pipe and map would return the final response as {data : {status : 'success , name : 'ram }}
    */
    return next.handle().pipe(map((data) => ({ data })));
  }
}
