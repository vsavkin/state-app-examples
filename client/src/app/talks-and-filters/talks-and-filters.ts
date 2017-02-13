import {Component, Inject} from "@angular/core";
import {Router, Params} from "@angular/router";
import {Filters, Talk, Action, State} from "../model";
import {Store} from "../store";

@Component({
  selector: 'app-cmp',
  templateUrl: './talks-and-filters.html',
  styleUrls: ['./talks-and-filters.css']
})
export class TalksAndFiltersCmp {
  constructor(private router: Router, private store: Store<State, Action>) {}

  get filters(): Filters {
    return this.store.state.filters;
  }

  get talks(): Talk[] {
    return this.store.state.list.map(n => this.store.state.talks[n]);
  }

  handleFiltersChange(filters: Filters): void {
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
