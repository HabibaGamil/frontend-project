import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authentication/interceptors/auth-interceptor.service';
import { AuthService } from './authentication/services/auth/auth.service';


@NgModule({
    declarations: [
        AppComponent,
    
    ],
    providers: [ 
        {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationModule,
        RouterModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule
    ]
   
})
export class AppModule { }
