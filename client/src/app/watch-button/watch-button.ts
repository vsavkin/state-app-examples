import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Talk} from "../model";

@Component({
  selector: 'watch-button',
  templateUrl: './watch-button.html',
  styleUrls: ['./watch-button.css']
})
export class WatchButtonCmp {
  @Input() talk: Talk;
  @Input() watched: boolean;
  @Output() watch = new EventEmitter();

  handleWatch(): void {
    this.watch.next(null);
  }
}
