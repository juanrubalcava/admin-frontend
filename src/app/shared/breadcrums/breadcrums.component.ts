import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titulo: string;
  content: any;

  constructor( private router: Router,
                private title: Title,
                private meta: Meta) {

      this.getDataRoute().subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      this.content = data.content;
      this.title.setTitle( this.titulo );

    const metaTag: MetaDefinition = {
      name: 'Description',
      titulo: this.titulo,
      content: this.content
    };

    this.meta.updateTag( metaTag );

    });
   }

  ngOnInit() {
  }

  getDataRoute() {

    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild == null ),
      map( (event: ActivationEnd ) => event.snapshot.data )
    );

  }

}
