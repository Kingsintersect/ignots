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
    .then( (res) => {
      localStorage.setItem("token", "true");
      
      if(res.user?.emailVerified == true){
        this.router.navigate(["/dashboard"]);
      }else{
        this.router.navigate(['/verify-email'])
      }
    }, err => {
      alert(err.message);
      this.router.navigate(["/login"]);
    })
  }

  //Login method
  Register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
    .then( (res) => {
      alert("Registration Successful");
      this.router.navigate(["/login"]);
      this.sentEmailVerification(res.user)
    }, err => {
      alert(err.message);
      this.router.navigate(["/register"]);
    })
  }

  // sign out
  Logout() {
    this.fireauth.signOut()
    .then( () => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }, err => {
      alert(err.message)
    })
  }

  // Forgot Password
  ForgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email)
    .then(() => {
      this.router.navigate(["/verify-email"]);
    }, err => {
      alert ("Something Went Wrong!")
    })
  }

  // Email verification
  sentEmailVerification( user: any) {
    user.sendEmailVerification()
    .then((res: any) => {
      this.router.navigate(["/verify-email"]);
    }, (err: any) => {
      alert("Something Went Wrong! Not Able To End Mail To Your Registerd Email")
    });
  }
}
