import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {  }

  ngOnInit(): void {
    
  }

  login() {
    if(this.email == ''){
      alert("Please enter an Email!");
      return;
    }
    
    if(this.password == ''){
      alert("Please enter a Password!");
      return;
    }

    this.auth.Login(this.email, this.password)
		this.email = '';
		this.password = '';
  }
}
