import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {AppCmp} from "./app/app";
import {TalksCmp} from "./talks/talks";
import {TalkCmp} from "./talk/talk";
import {WatchButtonCmp} from "./watch-button/watch-button";
import {RateButtonCmp} from "./rate-button/rate-button";
import {FormatRatingPipe} from "./pipes/format-rating.pipe";
import {Backend} from "./backend";
import {FiltersCmp} from "./filters/filters";
import {RouterModule} from "@angular/router";
import {TalksAndFiltersCmp} from "./talks-and-filters/talks-and-filters";
import {TalkDetailsCmp} from "./talk-details/talk-details";
import {HttpModule} from "@angular/http";
import {WatchService} from "./watch";
import {Store, connectToStore, StoreAndRouterConnector} from "./store";
import {reducer, initState} from "./model";

@NgModule({
  declarations: [
    AppCmp,
    TalksCmp,
    TalkCmp,
    TalkDetailsCmp,
    WatchButtonCmp,
    RateButtonCmp,
    FormatRatingPipe,
    FiltersCmp,
    TalksAndFiltersCmp
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(connectToStore([
      { path: '', pathMatch: 'full', redirectTo: 'talks' },
      { path: 'talks',  component: TalksAndFiltersCmp },
      { path: 'talk/:id', component: TalkDetailsCmp }
    ]), {useHash: true}),
  ],
  providers: [
    Backend,
    WatchService,
    { provide: Store, useFactory: (backend, watch) => new Store(reducer(backend, watch), initState), deps: [Backend, WatchService] },
    StoreAndRouterConnector
  ],
  bootstrap: [AppCmp]
})
export class AppModule { }

