import {Observable, Subject, Observer, Scheduler} from "rxjs";
import {of} from "rxjs/observable/of";
import {RouterStateSnapshot, CanActivateChild, ActivatedRouteSnapshot, Routes} from "@angular/router";
import {Injectable} from "@angular/core";

export type RollbackFunction<S, A> = (currentState: S, oldState: S, action: A) => S;
export type Reducer<S, A> = (store: Store<S,A>, state: S, action: A) => S|Observable<S>;

export type RouterNavigation = { type: 'ROUTER_NAVIGATION', state: RouterStateSnapshot };

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

@Injectable()
export class StoreAndRouterConnector implements CanActivateChild {
  private lastState: RouterStateSnapshot = null;
  constructor(private store: Store<any, any>) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.lastState === state) {
      return of(true);
    } else {
      this.lastState = state;
      return this.store.sendAction({type: 'ROUTER_NAVIGATION', state});
    }
  }
}

export function connectToStore(routes: Routes): Routes {
  return [
    {
      path: '',
      canActivateChild: [StoreAndRouterConnector],
      children: routes
    }
  ];
}