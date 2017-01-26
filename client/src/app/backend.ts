import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {of} from "rxjs/observable/of";
import {Injectable} from "@angular/core";
import {Filters, Talk} from "./model";

@Injectable()
export class Backend {
  private url = 'http://localhost:4444';
  _talks: {[n:number]: Talk} = {};
  _list: number[] = [];
  filters: Filters = {speaker: null, title: null, minRating: 0};

  constructor(private http: Http) {}

  get talks(): Talk[] {
    return this._list.map(n => this._talks[n]);
  }

  findTalk(id: number): Observable<Talk> {
    if (this._talks[id]) return of(this._talks[id]);

    const params = new URLSearchParams();
    params.set("id", id.toString());
    return this.http.get(`${this.url}/talk/`, {search: params}).map(r => this._talks[id] = r.json()['talk']);
  }

  rateTalk(id: number, rating: number): void {
    const talk = this._talks[id];
    talk.yourRating = rating;
    this.http.post(`${this.url}/rate`, {id: talk.id, yourRating: rating}).catch((e:any) => {
      talk.yourRating = null;
      throw e;
    }).forEach(() => {});
  }

  changeFilters(filters: Filters): void {
    this.filters = filters;
    this.refetch();
  }

  private refetch(): void {
    const params = new URLSearchParams();
    params.set("speaker", this.filters.speaker);
    params.set("title", this.filters.title);
    params.set("minRating", this.filters.minRating.toString());
    this.http.get(`${this.url}/talks`, {search: params}).map(r => r.json()).forEach((data) => {
      this._talks = data.talks;
      this._list = data.list;
    });
  }
}
