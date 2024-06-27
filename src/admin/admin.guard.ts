import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    //const request = context.switchToHttp().getRequest();
    // const isAdmin = request.user.role.includes('admin');
    const isAdmin = true;
    return isAdmin;
  }
}
