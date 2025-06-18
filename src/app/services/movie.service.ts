import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiResult, MovieResult } from './interfaces';
import { delay } from 'rxjs/operators';


const BASE_URL ='https://api.themoviedb.org/3';
const API_KEY = 'fad19a0ec8b4cf89195ff1111b608429';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);

  constructor() { }

  getTopRatedMovies(page: number = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=1&api_key=${API_KEY}`).pipe(delay(5000));

  }

  getMovieDetails(id: string): Observable<MovieResult> {

    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }


}
