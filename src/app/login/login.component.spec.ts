import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: { navigate: jasmine.Spy<jasmine.Func> };

  beforeEach(async () => {
    routerSpy = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule],
      declarations: [ LoginComponent ],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('togglePassword', () => {
    it('should set displayPassword to true and set passwordInputType to text', () => {
      component.togglePassword();

      expect(component.displayPassword).toBe(true);
      expect(component.passwordInputType).toBe('text');
    });

    it('should set displayPassword to false and set passwordInputType to password when toggled twice', () => {
      component.togglePassword();
      component.togglePassword();

      expect(component.displayPassword).toBe(false);
      expect(component.passwordInputType).toBe('password');
    });
  });

  describe('onSubmit', () => {
    it('should set submitted to true', () => {
      component.onSubmit();

      expect(component.submitted).toBe(true);
    });

    it('should not transition to home page if form is invalid', () => {
      component.onSubmit();

      expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/home']);
    });

    it('should transition to home page if form is valid', () => {
      component.loginForm.controls['username'].setValue('TestName');
      component.loginForm.controls['password'].setValue('TestPassword!');

      component.onSubmit();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
});
