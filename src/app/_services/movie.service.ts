import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Movie } from "@app/_models";

@Injectable({ providedIn: 'root' })
export class MovieService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    createMovie(model:Movie) {
        return this.http.post<any>(`${environment.apiUrl}/Movie/createMovie`, { model })
            .pipe(map(resp => {
                return resp;
            }));
    }
    getMovieByGenre(genre:number) {
        return this.http.get<any>(`${environment.apiUrl}/Movie/getMoviesByGenre/${genre}`)
            .pipe(map(resp => {
                return resp;
            }));
    }
    getAllGenre() {
        return this.http.get<any>(`${environment.apiUrl}/Movie/getAllGenre`)
            .pipe(map(resp => {
                return resp;
            }));
    }
}