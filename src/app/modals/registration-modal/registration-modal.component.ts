import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forbiddenCharactersValidator } from '../../shared/forbidden-characters.directive';
import { requiredCharactersValidator } from '../../shared/required-characters.directive';
import { emailValidator } from '../../shared/valid-email.directive';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss']
})
export class RegistrationModalComponent implements OnInit {
  public displayPassword = false;
  public passwordInputType = 'password';
  public submitted = false;
  public registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      forbiddenCharactersValidator(/ /g),
      requiredCharactersValidator(/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g)
    ]),
    email: new FormControl('', [Validators.required, emailValidator()]),
  });

  constructor(private router: Router,
              public dialogRef: MatDialogRef<RegistrationModalComponent>) { }

  ngOnInit(): void {
  }

  get username(): any {
    return this.registrationForm.get('username');
  }

  get password(): any {
    return this.registrationForm.get('password');
  }

  get email(): any {
    return this.registrationForm.get('email');
  }

  public togglePassword(): void {
    this.displayPassword = !this.displayPassword;

    if (this.displayPassword) {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.close();
      this.router.navigate(['/home']);
    }
  }
}
