import { Component, OnInit, PipeTransform, Output, EventEmitter } from '@angular/core';
import { Speech } from '../speech.model';
import { SpeechService } from '../speech.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-speech-search',
  templateUrl: './speech-search.component.html',
  styleUrls: ['./speech-search.component.scss']
})
export class SpeechSearchComponent implements OnInit {
  @Output() searchResult = new EventEmitter<string>();
  speeches: Array<Speech>;
  speeches$: Observable<Speech[]>;
  filter = new FormControl('');

  constructor(
    public speechService: SpeechService,
    public pipe: DatePipe
  ) { }
  ngOnInit() {
    this.speechService.getSpeeches().toPromise().then(Speeches => {
      this.speeches = Speeches;
      this.speeches$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, this.pipe))
      );
    });
  }
  search(text: string, pipe: PipeTransform, ): Speech[] {
    return this.speeches.filter(speech => {
      const term = text.toLowerCase();
      return speech.author.toLowerCase().includes(term)
          || speech.title.toLowerCase().includes(term)
          || speech.keywords.toString().toLowerCase().includes(term)
          || pipe.transform(speech.date).includes(term);
    });
  }
  open(speechId) {
    this.searchResult.emit(speechId);
  }

}
