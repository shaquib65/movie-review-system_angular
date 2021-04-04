import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateMovieComponent } from './movie/create-movie/create-movie.component';
import { ViewMovieComponent } from './movie/view-movie/view-movie.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        //data: { roles: [Role.User] }
    },
    {
        path: 'movie/view:id',
        component: ViewMovieComponent,
        canActivate: [AuthGuard],
        //data: { roles: [Role.User] }
    },
    {
        path: 'movie/create',
        component: CreateMovieComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'movie/edit:id',
        component: CreateMovieComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: '',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
