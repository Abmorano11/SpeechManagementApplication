import { Component, OnInit, Input } from '@angular/core';
import { Speech } from 'src/app/speech.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SpeechService } from '../speech.service';
import { ToastrService } from 'ngx-toastr';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import * as moment from 'moment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

class ShareForm {
  user_email: string;
  message: string;
  title: string;
  author: string;
  content: string;
}

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
  speechToShare = new ShareForm();
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
        date: new NgbDate(this.speech.date.getFullYear(), this.speech.date.getMonth(), this.speech.date.getDate()),
      });
    }
  }

  share(show: boolean) {
    if (show) {
      this.showShare = true;
    } else {
      const formValues = this.speechForm.value;
      this.speechToShare.author = formValues.author;
      this.speechToShare.title = formValues.title;
      this.speechToShare.content = formValues.content;
      emailjs.send('speech_app', 'speech_app_template', this.speechToShare, 'user_qCOQdt7MD0KqENM7K8pCM')
      .then((result: EmailJSResponseStatus) => {
        this.toastr.success('Successfully Shared Speech.', 'Success');
      }, (error) => {
        this.toastr.error(error.text, 'Error');
      });
      this.showShare = false;
    }
  }

  delete() {
    this.speechService.deleteSpeech(this.speech).toPromise().then(result => {
      this.speechForm.reset();
      if (result) {
        this.toastr.success('Successfully Deleted Speech.', 'Success');
      } else {
        this.toastr.error('Speech ID not found', 'Error');
      }
    });
  }

  edit(speechToEdit: Speech) {
    this.speechService.editSpeech(speechToEdit).toPromise().then(result => {
      this.speechForm.reset();
      if (result) {
        this.toastr.success('Successfully Edited Speech.', 'Success');
      } else {
        this.toastr.error('Speech ID not found', 'Error');
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
    speechToSave.date = moment(formValues.date).toDate();
    if (!this.speech) {
      this.speechService.addSpeech(speechToSave).toPromise().then(result => {
        this.speechForm.reset();
        if (result) {
          this.toastr.success('Successfully Added Speech.', 'Success');
        } else {
          this.toastr.error('Duplicate Speech ID found', 'Error');
        }
      });
    } else {
      this.edit(speechToSave);
    }
  }

}
