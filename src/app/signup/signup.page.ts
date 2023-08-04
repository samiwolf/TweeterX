import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username = '';
  email = '';
  password = '';
  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn)
    {
      this.router.navigate(['/home']);
    }
  }

  signup() {
    console.log(this.username, ' -- ',this.email, ' -- ', this.password);
    this.authService.signup({
      username: this.username,
      email: this.email,
      password: this.password
    }).then(
      (res: any) => {
        console.log(res);
        if (res && res.message === 'successful') {
          this.router.navigate(['/login']);
        }
      }
    ).catch((err) => {
      console.log(err.error.error);
    });
  }

}
