import { Component, OnInit, PipeTransform } from '@angular/core';
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
  private speeches: Array<Speech>;
  private speeches$: Observable<Speech[]>;
  private filter = new FormControl('');

  constructor(
    public speechService: SpeechService,
    pipe: DatePipe
  ) {
    this.speeches$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }
  ngOnInit() {
    this.speechService.getSpeeches().toPromise().then(Speeches => {
      this.speeches = Speeches;
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

}
