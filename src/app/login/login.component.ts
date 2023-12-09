import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Credentials, Service } from '../core/api.client.generated';
import { AuthService } from '../shared/auth.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    licenseIPdata: new FormControl(''),
    company: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  showPassBtnLabel = 'Show';
  required: any;
  licenseIP: string = '';
  // licenseIPdata: string | undefined;
  address = [
    { value: '172.16.20.235', label: '172.16.20.235' },
    { value: '172.16.20.236', label: '172.16.20.236' },
    { value: '172.16.20.238', label: '172.16.20.238' },
    { value: '172.16.20.239', label: '172.16.20.239' },
    { value: '172.16.20.240', label: '172.16.20.240' },
    { value: '172.16.20.247', label: '172.16.20.247' },
    { value: '172.16.20.250', label: '172.16.20.250' },
    { value: '172.16.40.30', label: '172.16.40.30' }
  ];
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private apiService: Service,
    private navbarService: NavbarService) { }
  ngOnDestroy(): void {
    this.navbarService.display();
  }

  ngOnInit(): void {
    this.navbarService.hide();
    this.licenseIP = this.address[0].value;
    this.loginForm = this.formBuilder.group({
      licenseIPdata: ['', Validators.required],
      company: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // onSelectAddress() {
  //   this.licenseIPdata = this.address.find(o => o.value == this.licenseIP)?.label;
  //   console.log(this.licenseIP);
  // }
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
    credential.address = this.f.licenseIPdata.value?.toString();
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
              didOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) => {
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
