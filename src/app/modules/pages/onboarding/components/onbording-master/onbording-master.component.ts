import { Component, OnInit } from '@angular/core';

import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';

@Component({
  selector: 'app-onbording-master',
  templateUrl: './onbording-master.component.html',
  styleUrl: './onbording-master.component.scss'
})
export class OnbordingMasterComponent implements OnInit {

  constructor(
    private serviceTmdb : TheMovieDBPort
  ) {

  }

  ngOnInit() {
    this.__init__();
  }

  __init__() {
    this.serviceTmdb.getFeaturedMovies().subscribe(
      (movies) => {
        console.log('movies', movies);
      }
    )
  }

}
