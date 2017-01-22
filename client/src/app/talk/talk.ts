import {Component, Input} from "@angular/core";
import {Talk} from "../model";

@Component({
  selector: 'talk-cmp',
  templateUrl: './talk.html',
  styleUrls: ['./talk.css']
})
export class TalkCmp {
  @Input() talk: Talk;
}
