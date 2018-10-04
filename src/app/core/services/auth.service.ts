import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  public isLoggedIn(): Promise<boolean> {
    return this.afAuth.user.toPromise()
      .then(user => !!user.uid);
  }

  public login() {
    return this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider())
      .catch(err => console.log('Could not sign in', err));
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
