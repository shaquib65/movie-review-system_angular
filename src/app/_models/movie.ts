import { Review } from "./review";

export class Movie {
    movieId:number;
    title:string;
    plot:string;
    castCrew:string;
    releaseDate
    budget
    language:string;
    coverImage:string;
    trailerUrl:string;
    overallRating
    currentReview:Review
    genres: number[];
    reviews :Review[];
    constructor(){
        this.genres = new Array<number>();
        this.reviews = new Array<Review>();
    }
}