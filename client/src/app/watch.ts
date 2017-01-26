import {Talk} from "./model";

export class WatchService {
  watch(talk: Talk): void {
    console.log("watch", talk.id);
  }
}
