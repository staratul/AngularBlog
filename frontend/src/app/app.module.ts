import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HeaderComponent } from './components/client/header/header.component';
import { SliderComponent } from './components/client/slider/slider.component';
import { PostCreateComponent } from './components/client/posts/post-create/post-create.component';
import { PostEditComponent } from './components/client/posts/post-edit/post-edit.component';
import { PostListComponent } from './components/client/posts/post-list/post-list.component';
import { HomeComponent } from './components/client/home/home.component';
import { AboutComponent } from './components/client/about/about.component';
import { ContactComponent } from './components/client/contact/contact.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { ContentComponent } from './components/client/content/content.component';
import { NavbarComponent } from './components/client/navbar/navbar.component';
import { HomePostComponent } from './components/client/home-post/home-post.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { TopNavbarComponent } from './components/admin/top-navbar/top-navbar.component';
import { LoginComponent } from './components/client/login/login.component';
import { RegisterComponent } from './components/client/register/register.component';
import { ForgotPasswordComponent } from './components/client/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/client/profile/profile.component';

import { AuthInterceptor } from './auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SliderComponent,
    PostCreateComponent,
    PostEditComponent,
    PostListComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ContentComponent,
    NavbarComponent,
    HomePostComponent,
    SidebarComponent,
    TopNavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
