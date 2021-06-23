import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  movieRes: Movie[] = [];
  titulo: string;

  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.titulo = params.texto;
      console.log(params.texto);
      this.peliculasService.buscarPelicula(params.texto).subscribe(movies =>{
        this.movieRes = movies;
        console.log(movies[0].title);
      })
    })

  }

}
