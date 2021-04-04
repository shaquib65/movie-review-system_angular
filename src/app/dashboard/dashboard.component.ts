import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
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
  genres:[];
  loadPage=false;
  constructor(private authenticationService: AuthenticationService,
    private movieService:MovieService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.movieService.getAllGenre().subscribe(resp=>{
      this.genres =  resp;
      this.loadPage = true;
      debugger;
    })
  }
  searchMovie(){

  }
}
