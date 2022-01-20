import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Speaker } from './speaker';

@Component({
  selector: 'app-speaker',
  styles: [`
.speaker-box {
  background: #EDEDED;
  margin: 5px 0;
}
.speaker-box h3 {
  font-weight: normal;
}`],
  template: `
<div class="speaker-box">
  <h3>Speaker: <span>{{(line$ | async) || 'speaker is quiet'}}</span></h3>
</div>`
})
export class SpeakerComponent implements OnInit {
  line$: Observable<string>;

  constructor(private speaker: Speaker) { }

  ngOnInit(): void {
    this.line$ = this.speaker.getLine();
  }
}
