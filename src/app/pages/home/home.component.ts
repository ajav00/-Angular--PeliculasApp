import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  

  public movies : Movie[] = [];
  public moviesSlideshow : Movie[] = [];


  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){

      if(this.peliculasService.cargando){return;}

      this.peliculasService.gertCartelera().subscribe(movie =>{
        this.movies.push(...movie);
      });
    }
  }
  constructor(private peliculasService: PeliculasService) {
      peliculasService.gertCartelera().subscribe( movies =>{
        //console.log(res);
        this.movies = movies;
        this.moviesSlideshow = movies;
      });
   }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.peliculasService.resetCarteleraPage();
  }

}
