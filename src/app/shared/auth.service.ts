import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  //Login method
  Login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
    .then( () => {
      localStorage.setItem("token", "true");
      this.router.navigate(["/dashboard"]);
    }, err => {
      alert(err.message);
      this.router.navigate(["/login"]);
    })
  }

  //Login method
  Register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
    .then( () => {
      alert("Registration Successful");
      this.router.navigate(["/login"]);
    }, err => {
      alert(err.message);
      this.router.navigate(["/register"]);
    })
  }

  // sign out
  Logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }, err => {
      alert(err.message)
    })
  }
}
