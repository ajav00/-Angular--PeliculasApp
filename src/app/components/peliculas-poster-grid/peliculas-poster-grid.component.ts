import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera-response.interface';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {
  
  @Input() movies: Movie[];


  constructor(private router: Router) { }

  ngOnInit(): void {
    
    console.log(this.movies);
  }
  onMovieClick(movie: Movie){
    console.log(movie);
    this.router.navigateByUrl(`pelicula/${movie.id}`);
  }

}
