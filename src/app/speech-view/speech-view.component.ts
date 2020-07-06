import { Component, OnInit, Input } from '@angular/core';
import { SpeechService } from '../speech.service';
import { Speech } from '../speech.model';

@Component({
  selector: 'app-speech-view',
  templateUrl: './speech-view.component.html',
  styleUrls: ['./speech-view.component.scss']
})
export class SpeechViewComponent implements OnInit {
  @Input() speechId?: string;
  constructor(public speechService: SpeechService) { }
  private speeches: Array<Speech>;
  private active;

  ngOnInit() {
    this.speechService.getSpeeches().toPromise().then(Speeches => {
      this.speeches = Speeches;
    });
    this.active = this.speechId ? this.speechId : this.speeches[0].id;
  }

}
