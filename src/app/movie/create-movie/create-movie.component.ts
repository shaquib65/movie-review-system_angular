import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '@app/_services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Movie } from '@app/_models';
export interface Genre {
  name: string;
}
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.less']
})
export class CreateMovieComponent implements OnInit {
  movieForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  movieId: number;
  genreArray = new Array<string>();
  genreIntArray = new Array<number>();
  genres: [];
  movieModel: Movie;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  currentGenre = new FormControl();
  showForm = false;

  constructor(public fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];

      this.movieService.getAllGenre().subscribe(resp => {
        this.genres = resp;
        if (this.movieId != null && this.movieId != 0) {
          this.movieService.getMovieById(this.movieId).subscribe(movie => {

            this.movieModel = movie;
            delete this.movieModel.overallRating;
            delete this.movieModel.currentReview;
            delete this.movieModel.reviews;
            this.initializeForm();
          })
        }
        else {
          this.initializeForm();
        }
      })

    });
  }
  initializeForm() {
    this.movieForm = this.fb.group({
      movieId: new FormControl(0),
      title: new FormControl('', [Validators.required]),
      plot: new FormControl('', [Validators.required]),
      castCrew: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required]),
      budget: new FormControl(0, [Validators.required]),
      language: new FormControl('', [Validators.required]),
      coverImage: new FormControl('', [Validators.required]),
      trailerUrl: new FormControl('', [Validators.required]),
      genres: new FormControl(this.genreIntArray, [Validators.required]),
    });
    if (this.movieId != null && this.movieId != 0) {
      this.movieForm.setValue(this.movieModel);
    }
    this.showForm = true;
  }
  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.movieForm.get('releasedate').setValue(convertDate, {
      onlyself: true
    })
  }

  add(event: MatChipInputEvent): void {
    debugger;
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.genreArray.length < 5) {
      //this.genreArray.push({ name: value.trim() })
    }
    if (input) {
      input.value = '';
    }
  }

  remove(genre): void {
    const index = this.genreArray.indexOf(genre);
    if (index >= 0) {
      this.genreArray.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    debugger;
    this.genreArray.push(event.option.viewValue);
    this.genreIntArray.push(event.option.value["genreId"])
    this.genreInput.nativeElement.value = '';
  }
  public errorHandling = (control: string, error: string) => {
    return this.movieForm.controls[control].hasError(error);
  }
  submitForm() {
    if (this.movieId != null && this.movieId != 0) {
      this.movieService.createMovie(this.movieForm.value).subscribe(resp => {
        if (resp.movieId != 0) {
          window.alert("Record Created");
        }
        else {
          window.alert("Error");
        }

      })
    }
    else {

      this.movieService.updateMovie(this.movieForm.value).subscribe(resp => {
        window.alert("Record Updated");
      });

    }
  }
}
