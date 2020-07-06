import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SpeechViewComponent } from './speech-view/speech-view.component';
import { SpeechAddComponent } from './speech-add/speech-add.component';
import { SpeechSearchComponent } from './speech-search/speech-search.component';
import { SpeechFormComponent } from './speech-view/speech-content/speech-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechViewComponent,
    SpeechAddComponent,
    SpeechSearchComponent,
    SpeechFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
