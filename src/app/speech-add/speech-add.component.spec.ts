import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAddComponent } from './speech-add.component';

describe('SpeechAddComponent', () => {
  let component: SpeechAddComponent;
  let fixture: ComponentFixture<SpeechAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
