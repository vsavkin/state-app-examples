import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Injectable} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule} from '@angular/material';

import { AppCmp } from './app/app';
import { TalksCmp } from './talks/talks';
import { TalkCmp } from './talk/talk';
import { WatchButtonCmp } from './watch-button/watch-button';
import { RateButtonCmp } from './rate-button/rate-button';
import { FormatRatingPipe } from './pipes/format-rating.pipe';
import {createFiltersObject} from "./model";
import {Backend} from "./backend";
import { FiltersCmp } from './filters/filters';
import {RouterModule} from "@angular/router";
import {TalksAndFiltersCmp} from "./talks-and-filters/talks-and-filters";
import {TalkDetailsCmp} from "./talk-details/talk-details";
import {HttpModule, Http} from "@angular/http";
import {WatchService} from "./watch";

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
    RouterModule.forRoot([
      { path: '',  pathMatch: 'full', component: TalksAndFiltersCmp },
      { path: 'talk/:id', component: TalkDetailsCmp }
    ], {useHash: true}),
  ],
  providers: [
    Backend,
    WatchService,
    { provide: 'createFiltersObject', useValue: createFiltersObject }
  ],
  bootstrap: [AppCmp]
})
export class AppModule { }
