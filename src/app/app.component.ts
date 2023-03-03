import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ignots';
  logged_in: string | null = "";
  url: string = "";

  constructor(private auth: AuthService) {
    this.logged_in = localStorage.getItem("token");
  }
  ngOnInit(): void {
    this.url = window.location.pathname;
    this.auth.isLoggedIn(this.logged_in, this.url)
  }

}
