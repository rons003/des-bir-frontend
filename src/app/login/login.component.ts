import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Credentials, Service } from '../core/api.client.generated';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    company: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  showPassBtnLabel = 'Show';
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private apiService: Service) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      company: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Submitted');
    this.loading = true;
    const credential = new Credentials();
    credential.company = this.f.company.value?.toString();
    credential.userName = this.f.username.value?.toString();
    credential.password = this.f.password.value?.toString();
    this.apiService.login(credential)
      .subscribe(
        response => {
          if (response.status == 'success') {
            localStorage.setItem('currentUserBIR', JSON.stringify(response.data));
            this.router.navigate(['']);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            });
          } else {
            //this.error = response.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
            });
          }
          this.loading = false;
        },
        error => {
          // this.error = error;
          // this.loading = false;
        }
      );

  }

}
