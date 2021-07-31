import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnInit, OnDestroy {
  public titulo: string = "";
  public tituloSub$!: Subscription;
  constructor(private router: Router, private activaterRouter: ActivatedRoute) {
    this.tituloSub$ = this.getDataRoute().
      subscribe(
        data => {
          this.titulo = data.titulo;
          document.title = `Peru 21 - ${this.titulo}`;
        }
      );
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter((data: any) => data instanceof ActivationEnd),
      filter((data: ActivationEnd) => data.snapshot.firstChild === null),
      map((data: ActivationEnd) => data.snapshot.data)
    );
  }


}
