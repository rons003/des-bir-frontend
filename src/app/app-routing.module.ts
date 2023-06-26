import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './_guards/login.guard';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MonitoringComponent,
    // canActivate: [AuthGuard],
    data: { title: 'Monitoring Page' }
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoginGuard],
    data: {
      title: 'Login Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
