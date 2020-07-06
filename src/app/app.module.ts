import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SpeechViewComponent } from './speech-view/speech-view.component';
import { SpeechAddComponent } from './speech-add/speech-add.component';
import { SpeechSearchComponent } from './speech-search/speech-search.component';
import { SpeechFormComponent } from './speech-form/speech-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

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
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
