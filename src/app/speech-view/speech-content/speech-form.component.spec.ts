import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechFormComponent } from './speech-form.component';

describe('SpeechContentComponent', () => {
  let component: SpeechFormComponent;
  let fixture: ComponentFixture<SpeechFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
