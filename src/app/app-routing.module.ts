import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './_guards/login.guard';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'apv',
    component: MonitoringComponent,
    canActivate: [AuthGuard],
    data: { title: 'Monitoring Page' }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    redirectTo: '/apv',
    pathMatch: 'full'
  },
  { path: '**', component: MonitoringComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
