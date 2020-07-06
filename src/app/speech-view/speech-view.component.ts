import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../speech.service';
import { Speech } from '../speech.model';

@Component({
  selector: 'app-speech-view',
  templateUrl: './speech-view.component.html',
  styleUrls: ['./speech-view.component.scss']
})
export class SpeechViewComponent implements OnInit {

  constructor(public speechService: SpeechService) { }
  private speeches: Array<Speech>;

  ngOnInit() {
    this.speechService.getSpeeches().toPromise().then(Speeches => {
      this.speeches = Speeches;
    });
  }

}
