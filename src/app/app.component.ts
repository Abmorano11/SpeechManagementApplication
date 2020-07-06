import { Component } from '@angular/core';
import { SpeechService } from './speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
  active = 1;
  speechId = '';
  showSpeech(speechIdToShow) {
    this.active = 1;
    this.speechId = speechIdToShow;
  }
}
