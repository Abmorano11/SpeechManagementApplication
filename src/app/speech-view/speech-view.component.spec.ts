import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechViewComponent } from './speech-view.component';

describe('SpeechViewComponent', () => {
  let component: SpeechViewComponent;
  let fixture: ComponentFixture<SpeechViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
