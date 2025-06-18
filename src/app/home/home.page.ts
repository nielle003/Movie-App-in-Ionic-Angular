import { Component, inject } from '@angular/core';
import { IonHeader,
 IonToolbar, 
 IonTitle, 
 IonContent, 
 InfiniteScrollCustomEvent, 
 IonList, 
 IonItem, 
 IonSkeletonText, 
 IonAvatar, 
 IonAlert, 
 IonLabel, 
 IonThumbnail, 
 IonBadge, 
 IonInfiniteScroll, 
 IonInfiniteScrollContent } from '@ionic/angular/standalone';

import { MovieService } from '../services/movie.service';
import { catchError } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { finalize } from 'rxjs/operators';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonSkeletonText, 
    IonAvatar,  
    CommonModule, 
    IonAlert, 
    IonLabel, 
    IonThumbnail, 
    DatePipe,  
    RouterModule, 
    IonBadge, 
    IonInfiniteScroll, 
    IonInfiniteScrollContent],
})
export class HomePage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies:MovieResult[]= [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  trackById(index: number, item: any): number {
  return item.id;
  }

  public dummyArray = new Array(5);
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent){
    if(!event){
      this.isLoading = true;
    }
    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() =>{
        this.isLoading = false;
        if (event){
          event.target.complete();

        }
      }),
      catchError((err: any) => {
        console.log(err);

        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) =>{
        console.log(res);
        this.movies.push(...res.results);
        if (event){
        event.target.disabled = res.total_pages ===this.currentPage;
        }
      }

    })
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
}
