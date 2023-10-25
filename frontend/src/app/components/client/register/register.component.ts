import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private customValidator: CustomvalidationService
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    },{ 
      validator: this.customValidator.MatchPassword('password', 'confirm_password'),
    })
  }

  ngOnInit(): void {
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.submitted = true;
    if(this.registerForm.valid) {
      const user = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      }
      this.authService.register(user).subscribe((res: any) => {
        this.registerForm.reset();
        this.authService.redirectToProfile(res);
      })
    }
  }

}
