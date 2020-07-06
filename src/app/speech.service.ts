import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Speech } from './speech.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor() { }
  private Speeches = new Array<Speech>();

  public getSpeeches(): Observable<Speech[]> {
    return of(this.Speeches);
  }

  public addSpeech(speech: Speech) {
    this.Speeches.push(speech);
  }

  public filterSpeechByAuthor(author: string) {
    return _.filter(this.Speeches, (speech) => {
      return speech.author.search(author);
    });
  }

  public filterSpeechByTitle(title: string) {
    return _.filter(this.Speeches, (speech) => {
      return speech.title.search(title);
    });
  }
}
