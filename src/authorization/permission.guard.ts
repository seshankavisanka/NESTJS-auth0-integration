import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const userPermissions = req?.user?.permissions || [];
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const hasAllRequiredPermissions = requiredPermissions.every((permissions) =>
      userPermissions.includes(permissions),
    );

    if (requiredPermissions.length === 0 || hasAllRequiredPermissions) {
      return true;
    }
    throw new ForbiddenException();
  }
}
