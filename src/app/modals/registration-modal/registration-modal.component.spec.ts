import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { RegistrationModalComponent } from './registration-modal.component';
import {Router} from '@angular/router';

describe('RegistrationModalComponent', () => {
  let component: RegistrationModalComponent;
  let fixture: ComponentFixture<RegistrationModalComponent>;
  let routerSpy: { navigate: jasmine.Spy<jasmine.Func> };
  let dialogSpy: { close: jasmine.Spy<jasmine.Func> };

  beforeEach(async () => {
    routerSpy = { navigate: jasmine.createSpy('navigate') };
    dialogSpy = { close: jasmine.createSpy('close') };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy }],
      declarations: [ RegistrationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationModalComponent);
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

  describe('close', () => {
    it('should close the dialog', () => {
      component.close();

      expect(dialogSpy.close).toHaveBeenCalled();
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
      component.registrationForm.controls['username'].setValue('TestName');
      component.registrationForm.controls['password'].setValue('TestPassword!');
      component.registrationForm.controls['email'].setValue('email@email.com');

      component.onSubmit();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should close modal if form is valid', () => {
      component.registrationForm.controls['username'].setValue('TestName');
      component.registrationForm.controls['password'].setValue('TestPassword!');
      component.registrationForm.controls['email'].setValue('email@email.com');
      spyOn(component, 'close');

      component.onSubmit();

      expect(component.close).toHaveBeenCalled();
    });
  });
});
