import { Component, OnInit, Input } from '@angular/core';
import { Speech } from 'src/app/speech.model';

@Component({
  selector: 'app-speech-form',
  templateUrl: './speech-form.component.html',
  styleUrls: ['./speech-form.component.scss']
})
export class SpeechFormComponent implements OnInit {
  @Input() speech?: Speech;
  constructor() { }

  ngOnInit() {
  }

}
