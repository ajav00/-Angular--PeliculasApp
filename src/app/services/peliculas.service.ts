import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { CarteleraResponse, Movie } from '../interfaces/cartelera-response.interface';
import { MovieResponse } from '../interfaces/movie-response.interface';
import { CreditsResponse, Cast } from '../interfaces/cast-response.interface';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  get params(){
    return{
      api_key: '0fa05fbde0a4346d1d6e0f414ae4332a',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  gertCartelera():Observable<Movie[]>{

    if(this.cargando){
      return of ([]) ;
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {params: this.params})
    .pipe( 
      map((resp) => resp.results),
      tap ( () =>{
        this.carteleraPage += 1;
        this.cargando = false;
    }));
  }


  buscarPelicula(texto: string):Observable<Movie[]>{


    const params = {...this.params, page: '1', query: texto};
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {params})
    .pipe( 
      map((resp) => resp.results));
  }


  getPeliculaDetalle(id: string){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {params: this.params})
    .pipe(catchError(err => of (null)))
  }

  getCast(id: string):Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {params: this.params})
    .pipe(map(resp => resp.cast), catchError(err => of (null)),
    );
  }
}
