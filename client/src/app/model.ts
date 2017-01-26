import {WatchService} from "./watch";
import {Backend} from "./backend";
import {Observable} from "rxjs";
import {Reducer, Store} from "./store";
import {Params} from "@angular/router";


export type Talk = { id: number, title: string, speaker: string, description: string, yourRating: number, rating: number };
export type Filters = { speaker: string, title: string, minRating: number };
export type State = { talks: { [id: number]: Talk }, list: number[], filters: Filters, watched: { [id: number]: boolean } };

export type ShowDetail = { type: 'SHOW_DETAIL', talkId: number };
export type Filter = { type: 'FILTER', filters: Filters };
export type Watch = { type: 'WATCH', talkId: number };
export type Rate = { type: 'RATE', talkId: number, rating: number };
export type Unrate = { type: 'UNRATE', talkId: number, error: any };
export type Action = Filter | ShowDetail | Watch | Rate | Unrate;

export const initState: State = {talks: {}, list: [], filters: {speaker: null, title: null, minRating: 0}, watched: {}};

export function reducer(backend: Backend, watch: WatchService): Reducer<State, Action> {
  return (store: Store<State, Action>, state: State, action: Action): State|Observable<State> => {
    switch (action.type) {
      case 'FILTER':
        return backend.findTalks(action.filters).map(r => ({...state, ...r, filters: action.filters}));

      case 'SHOW_DETAIL':
        if (state.talks[action.talkId]) return state;
        return backend.findTalk(action.talkId).map(t => ({...state, talks: {...state.talks, [t.id]: t}}));

      case 'WATCH':
        const talkToWatch = state.talks[action.talkId];
        watch.watch(talkToWatch);
        const updatedWatched = {...state.watched, [action.talkId]: true};
        return {...state, watched: updatedWatched};

      case 'RATE':
        backend.rateTalk(action.talkId, action.rating).catch(e =>
          store.sendAction({type: 'UNRATE', talkId: action.talkId, error: e})
        ).forEach(() => {});

        const talkToRate = state.talks[action.talkId];
        const ratedTalk = {...talkToRate, yourRating: action.rating};
        const updatedTalks = {...state.talks, [action.talkId]: ratedTalk};
        return {...state, talks: updatedTalks};

      case 'UNRATE':
        const talkToUnrate = state.talks[action.talkId];
        const unratedTalk = {...talkToUnrate, yourRating: null};
        const updatedTalksAfterUnrating = {...state.talks, [action.talkId]: unratedTalk };
        return {...state, talks: updatedTalksAfterUnrating};

      default:
        return state;
    }
  }
}

function createFilters(p: Params): Filters {
  return {speaker: p['speaker'] || null, title: p['title'] || null, minRating: p['minRating'] ? +p['minRating'] : 0};
}