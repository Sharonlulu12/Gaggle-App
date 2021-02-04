import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationModalComponent } from '../modals/registration-modal/registration-modal.component'
import { forbiddenCharactersValidator } from '../shared/forbidden-characters.directive';
import { requiredCharactersValidator } from '../shared/required-characters.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public displayPassword = false;
  public passwordInputType = 'password';
  public submitted = false;
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      forbiddenCharactersValidator(/ /g),
      requiredCharactersValidator(/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g)
    ])
  });

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {}

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  public togglePassword(): void {
    this.displayPassword = !this.displayPassword;
    if (this.displayPassword) {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  public openRegistrationModal(): void {
    this.dialog.open(RegistrationModalComponent, {
      height: '365px',
      width: '470px',
      panelClass: 'custom-dialog-container'
    });
  }
}
