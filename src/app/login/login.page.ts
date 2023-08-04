import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = 'janedoe@doe.com';
  password = 'notsosecurepassword';

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

  login() {

    console.log(this.email, ' -- ', this.password);
    this.authService.login({
      email: this.email,
      password: this.password
    }).then(
      (res: any) => {
        console.log(res);
        if (res.token) {
          this.authService.setAuthToken(res.token);
          this.router.navigate(['/home']);
        }
      }
    ).catch((err) => {
      console.log(err.error.error);
    });
  }
}
