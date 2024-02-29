/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import {} from 'module';

export const 
 GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user['data'];
  },
);
