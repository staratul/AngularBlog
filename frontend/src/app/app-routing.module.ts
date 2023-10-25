import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AboutComponent } from './components/client/about/about.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { ForgotPasswordComponent } from './components/client/forgot-password/forgot-password.component';
import { HomeComponent } from './components/client/home/home.component';
import { LoginComponent } from './components/client/login/login.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { RegisterComponent } from './components/client/register/register.component';
import { RedirectGuard } from './redirect.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent, canActivate: [RedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RedirectGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: SidebarComponent, children: [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  ]}                                      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
