import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Service } from 'src/app/core/api.client.generated';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  public isMenuCollapsed = true;
  userName: string = '';
  dbName: string = '';
  extDESIHO: string = 'zzTEST_EXT';
  extDESMHO: string = 'zzTEST_EXTDESMHO';
  showNavbar: boolean = true;
  subscription: Subscription;
  constructor(
    public authService: AuthService,
    private router: Router,
    private apiService: Service,
    private navbarService: NavbarService  
  ) { 
      this.subscription = this.navbarService.showNavbar.subscribe((value)=>{
        this.showNavbar =value;
      })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dbName = this.authService.getDB();
    console.log(this.authService.getDB());
    // this.userName = this.authService.getUserName();
  }

  logout() {

        this.authService.logout();
        this.router.navigate(['login']);

  }

}
