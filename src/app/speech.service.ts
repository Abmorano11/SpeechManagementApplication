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

  public addSpeech(speechToAdd: Speech) {
    if (this.Speeches.find(speech => speech.id === speechToAdd.id)) {
      return false;
    } else {
      this.Speeches.push(speechToAdd);
      return true;
    }
  }

  public editSpeech(speechToEdit: Speech) {
    const speechIndex = this.Speeches.findIndex(speech => speech.id === speechToEdit.id);
    if (speechIndex !== -1) {
      this.Speeches[speechIndex] = speechToEdit;
      return true;
    } else {
      return false;
    }
  }

  public deleteSpeech(speechToRemove: Speech) {
    const speechIndex = this.Speeches.findIndex(speech => speech.id === speechToRemove.id);
    if (speechIndex !== -1) {
      this.Speeches.splice(speechIndex, 1);
      return true;
    } else {
      return false;
    }
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
