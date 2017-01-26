import {Component, Inject} from "@angular/core";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Filters, Talk, Action, State} from "../model";
import {Store} from "../store";

@Component({
  selector: 'app-cmp',
  templateUrl: './talks-and-filters.html',
  styleUrls: ['./talks-and-filters.css']
})
export class TalksAndFiltersCmp {
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<State, Action>) {
    route.params.subscribe((p:any) => {
      const filters = {speaker: p.speaker || null, title: p.title || null, minRating: p.minRating ? +p.minRating : 0};
      this.store.sendAction({
        type: 'FILTER',
        filters: filters
      });
    });
  }

  get filters(): Filters {
    return this.store.state.filters;
  }

  get talks(): Talk[] {
    return this.store.state.list.map(n => this.store.state.talks[n]);
  }

  handleFiltersChange(filters: Filters): void {
    this.store.sendAction({
      type: 'FILTER',
      filters: filters
    });
    this.router.navigate(["/talks", this.createParams(filters)]);
  }

  private createParams(filters: Filters): Params {
    const r:any = {};
    if (filters.speaker) r.speaker = filters.speaker;
    if (filters.title) r.title = filters.title;
    if (filters.minRating) r.minRating= filters.minRating;
    return r;
  }
}
