import {Component, Inject} from "@angular/core";
import {Backend} from "../backend";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Filters} from "../model";

@Component({
  selector: 'app-cmp',
  templateUrl: './talks-and-filters.html',
  styleUrls: ['./talks-and-filters.css']
})
export class TalksAndFiltersCmp {
  constructor(public backend: Backend, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe((p:any) => {
      const filters = {speaker: p.speaker || null, title: p.title || null, minRating: p.minRating ? +p.minRating : 0};
      this.backend.changeFilters(filters);
    });
  }

  handleFiltersChange(filters: Filters): void {
    this.backend.changeFilters(filters);
    this.router.navigate(["/talks", this.createParams(filters)]);
  }

  private createParams(filters: Filters): Params {
    const r:any = {};
    if (filters.speaker) r.speaker = filters.speaker;
    if (filters.title) r.title = filters.title;
    if (filters.minRating) r.minRating = filters.minRating;
    return r;
  }
}
