import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bir-frontend';
  constructor(public authService: AuthService,
    private router: Router) {

  }
  ngOnInit() {
    // if (!this.authService.isLoggedIn())
    //   this.router.navigate(['login']);
  }
}
