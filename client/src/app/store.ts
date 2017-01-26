import {Observable, Subject, Observer, Scheduler} from "rxjs";
import {of} from "rxjs/observable/of";
import {Injectable} from "@angular/core";

export type Reducer<S, A> = (store: Store<S,A>, state: S, action: A) => S|Observable<S>;

@Injectable()
export class Store<S, A> {
  private actions = new Subject<{action: A, result: Observer<boolean>}>();

  constructor(private reducer: Reducer<S, A>, public state: S) {
    this.actions.observeOn(Scheduler.async).mergeMap(a => {
      const state = reducer(this, this.state, a.action);
      const obs = state instanceof Observable ? state : of(state);
      return obs.map(state => ({state, result: a.result}));
    }).subscribe(pair => {
      this.state = pair.state;
      pair.result.next(true);
      pair.result.complete();
    });
  }

  sendAction(action: A): Observable<boolean> {
    const res = new Subject<boolean>();
    this.actions.next({action, result: res});
    return res;
  }
}