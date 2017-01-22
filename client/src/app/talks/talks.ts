import {Component, Input} from '@angular/core';
import {Talk} from "../model";

@Component({
  selector: 'talks-cmp',
  templateUrl: './talks.html',
  styleUrls: ['./talks.css']
})
export class TalksCmp {
  @Input() talks: Talk[];
}
