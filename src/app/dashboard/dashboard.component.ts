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
  selectedGenre:number;
  movieList:Movie[];
  originalMovieList:Movie[];
  genres:[];
  loadPage=false;
  constructor(
    private authenticationService: AuthenticationService,
    private movieService:MovieService,
    private router:Router) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.movieService.getAllGenre().subscribe(resp=>{
      this.genres =  resp;
      
      this.movieService
      .getMovieByGenre().subscribe((movieData:Movie[])=>{
        this.movieList = new Array<Movie>();
        this.originalMovieList = new Array<Movie>();
        this.originalMovieList = [...movieData];
        this.movieList = movieData;
        this.loadPage = true;
      })
    })
  }

  searchMovie(){
    let tempArray = [...this.originalMovieList];
    if(this.selectedGenre != null && this.selectedGenre.toString() != '0'){
      tempArray = tempArray.filter(x=>x.genres.includes(this.selectedGenre));
    }
    if(this.keyword != ""){
      tempArray = tempArray.filter(x=>x.title.includes(this.keyword));
    }
    this.movieList = [...tempArray];

  }

  createNewMovie(){
    this.router.navigateByUrl('/movie/create');
  }

  editMovie(movieId){
    this.router.navigateByUrl('/movie/edit/'+movieId);
  }
  deleteMovie(movieId){
    this.movieService.deleteMovie(movieId).subscribe(resp=>{
      window.alert("Succesfully Deleted");
      this.movieList.filter(x=>x.movieId != movieId);
    })
  }
  viewMovie(movieId){
    this.router.navigateByUrl('/movie/view/'+movieId);
  }
}
