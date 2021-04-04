import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CreateMovieComponent } from './movie/create-movie/create-movie.component';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';
import { CommonModule } from '@angular/common';;
import { MaterialModule } from './material.module'
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule ,
        MaterialModule   ],
    declarations: [
        AppComponent,
        DashboardComponent,
        CreateMovieComponent,
        ViewMovieComponent,
        LoginComponent,
        DashboardComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }