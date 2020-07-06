import { Component, OnInit, Input } from '@angular/core';
import { Speech } from 'src/app/speech.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SpeechService } from '../speech.service';
import { ToastrService } from 'ngx-toastr';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-speech-form',
  templateUrl: './speech-form.component.html',
  styleUrls: ['./speech-form.component.scss']
})
export class SpeechFormComponent implements OnInit {
  @Input() speech?: Speech;
  constructor(
    public speechService: SpeechService,
    public toastr: ToastrService
  ) { }

  showShare = false;
  speechToShare = new Speech();
  speechForm = new FormGroup({
    content: new FormControl(''),
    title: new FormControl(''),
    keywords: new FormControl(''),
    author: new FormControl(''),
    date: new FormControl(new Date())
  });

  ngOnInit() {
    if (this.speech) {
      this.speechForm.setValue({
        content: this.speech.content,
        title: this.speech.title,
        keywords: this.speech.keywords.toString(),
        author: this.speech.author,
        date: this.speech.date,
      });
    }
  }

  share(show: boolean, e?) {
    if (show) {
      this.showShare = true;
    } else {
      const formValues = this.speechForm.value;
      this.speechToShare.author = formValues.author;
      this.speechToShare.title = formValues.title;
      this.speechToShare.content = formValues.content;
      emailjs.sendForm('speech_app', 'speech_app_template', e.target as HTMLFormElement, 'user_qCOQdt7MD0KqENM7K8pCM')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
      this.showShare = false;
    }
  }

  delete() {
    this.speechService.deleteSpeech(this.speech).toPromise().then(result => {
      if (result) {
        this.toastr.success('Success', 'Successfully Deleted Speech.');
      } else {
        this.toastr.error('Error', 'Speech ID not found');
      }
    });
  }

  edit(speechToEdit: Speech) {
    this.speechService.editSpeech(speechToEdit).toPromise().then(result => {
      if (result) {
        this.toastr.success('Success', 'Successfully Edited Speech.');
      } else {
        this.toastr.error('Error', 'Speech ID not found');
      }
    });
  }

  save() {
    const speechToSave = new Speech();
    const formValues = this.speechForm.value;
    speechToSave.id = !!this.speech ? this.speech.id : Date.now().toString() + formValues.author;
    speechToSave.author = formValues.author;
    speechToSave.title = formValues.title;
    speechToSave.keywords = formValues.keywords.split(', ');
    speechToSave.content = formValues.content;
    speechToSave.date = formValues.date;
    if (!this.speech) {
      this.speechService.addSpeech(speechToSave).toPromise().then(result => {
        if (result) {
          this.toastr.success('Success', 'Successfully Added Speech.');
        } else {
          this.toastr.error('Error', 'Duplicate Speech ID found');
        }
      });
    } else {
      this.edit(speechToSave);
    }
  }

}
