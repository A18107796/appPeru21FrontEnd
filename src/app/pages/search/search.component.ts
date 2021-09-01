import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchResults: any[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sideBar: SidebarService) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.activatedRoute.params.subscribe(
      params => {
        let term = params['term'];
        this.searchResults = this.sideBar.searchItem(term);
        console.log(this.searchResults);
        
      }
    )
  }

}
