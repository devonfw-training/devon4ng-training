import { Component } from '@angular/core';

import { Speaker } from './speaker';

@Component({
    selector: 'speaker',
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
  <h3>Speaker: <span>{{(speaker.lines$ | async) || 'speaker is quiet'}}</span></h3>
</div>`
})
export class SpeakerComponent {
    constructor(private speaker: Speaker) {}
}
