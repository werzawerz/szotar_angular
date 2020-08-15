import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavingComponent } from './naving.component';

describe('NavingComponent', () => {
  let component: NavingComponent;
  let fixture: ComponentFixture<NavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
