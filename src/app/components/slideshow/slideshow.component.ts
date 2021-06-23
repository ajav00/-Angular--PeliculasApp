import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response.interface';


import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
    console.log(this.movies);
  }
  ngAfterViewInit():void{
    this.mySwiper = new Swiper('.swiper-container', {
      
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  slideNext(){
    this.mySwiper.slideNext();
  }

  slidePrev(){
    this.mySwiper.slidePrev()
  }

}
