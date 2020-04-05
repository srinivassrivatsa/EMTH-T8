import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser: any) => appUser.isAdmin));
  }
}
