import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Speech } from './speech.model';
import _speeches from '../assets/BaseData.json';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor(public toastr: ToastrService) { }
  public Speeches: Array<Speech> = _speeches;

  public getSpeeches(): Observable<Speech[]> {
    return of(this.Speeches);
  }

  public addSpeech(speechToAdd: Speech): Observable<boolean> {
    if (this.Speeches.find(speech => speech.id === speechToAdd.id)) {
      return of(false);
    } else {
      this.Speeches.push(speechToAdd);
      return of(true);
    }
  }

  public editSpeech(speechToEdit: Speech): Observable<boolean> {
    const speechIndex = this.Speeches.findIndex(speech => speech.id === speechToEdit.id);
    if (speechIndex > -1) {
      this.Speeches[speechIndex] = speechToEdit;
      return of(true);
    } else {
      return of(false);
    }
  }

  public deleteSpeech(speechToRemove: Speech): Observable<boolean> {
    const speechIndex = this.Speeches.findIndex(speech => speech.id === speechToRemove.id);
    if (speechIndex > -1) {
      this.Speeches.splice(speechIndex, 1);
      return of(true);
    } else {
      return of(false);
    }
  }
}
