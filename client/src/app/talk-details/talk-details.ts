import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/mergeMap';
import {Talk, State, Action} from "../model";
import {Store} from "../store";

@Component({
  selector: 'talk-details-cmp',
  templateUrl: './talk-details.html',
  styleUrls: ['./talk-details.css']
})
export class TalkDetailsCmp {
  constructor(private store: Store<State, Action>, private route: ActivatedRoute) {
    route.params.forEach(p => {
      this.store.sendAction({
        type: 'SHOW_DETAIL',
        talkId: p['id']
      });
    });
  }

  get talk(): Talk {
    return this.store.state.talks[+this.route.snapshot.params['id']];
  }

  get watched(): boolean {
    return this.store.state.watched[+this.route.snapshot.params['id']];
  }

  handleRate(newRating: number): void {
    this.store.sendAction({
      type: 'RATE',
      talkId: this.talk.id,
      rating: newRating
    });
  }

  handleWatch(): void {
    this.store.sendAction({
      type: 'WATCH',
      talkId: this.talk.id
    });
  }
}