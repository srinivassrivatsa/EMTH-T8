import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid);

      return of(null);      
    }));
  }
}
