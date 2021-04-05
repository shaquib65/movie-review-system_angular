import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { MovieService } from '@app/_services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  user: User;
  keyword:string;
  selectedGenre:string;
  movieList:Movie;
  genres:[];
  loadPage=false;
  constructor(
    private authenticationService: AuthenticationService,
    private movieService:MovieService,
    private router:Router) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.movieService.getAllGenre().subscribe(resp=>{
      this.genres =  resp;
      
      this.movieService
      .getMovieByGenre().subscribe((movieData:Movie)=>{
        this.movieList = new Movie();
        this.movieList = movieData;
        this.loadPage = true;
      })
    })
  }
  searchMovie(){

  }
  createNewMovie(){
    this.router.navigateByUrl('/movie/create')
  }
}
