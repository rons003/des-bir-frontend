import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  userName: string = '';
  constructor(
    // public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.userName = this.authService.getUserName();
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['login']);
  }

}
