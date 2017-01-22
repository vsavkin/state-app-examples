import {Component, Inject} from "@angular/core";
import {Backend} from "../backend";
import {Router, ActivatedRoute} from "@angular/router";
import {Filters} from "../model";

@Component({
  selector: 'app-cmp',
  templateUrl: './talks-and-filters.html',
  styleUrls: ['./talks-and-filters.css']
})
export class TalksAndFiltersCmp {
  constructor(public backend: Backend, private router: Router, private route: ActivatedRoute, @Inject('createFiltersObject') createFilters: Function) {
    route.queryParams.subscribe(p => {
      this.backend.changeFilters(createFilters(p));
    });
  }

  handleFiltersChange(filters: Filters): void {
    this.backend.changeFilters(filters);
    this.router.navigate(["/"], {queryParams: filters});
  }
}
