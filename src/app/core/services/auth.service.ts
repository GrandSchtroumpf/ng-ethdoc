import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  public login() {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
