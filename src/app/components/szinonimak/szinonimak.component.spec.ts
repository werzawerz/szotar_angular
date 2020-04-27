import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzinonimakComponent } from './szinonimak.component';

describe('SzinonimakComponent', () => {
  let component: SzinonimakComponent;
  let fixture: ComponentFixture<SzinonimakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzinonimakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzinonimakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
