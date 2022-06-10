import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypurschasesComponent } from './mypurschases.component';

describe('MypurschasesComponent', () => {
  let component: MypurschasesComponent;
  let fixture: ComponentFixture<MypurschasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypurschasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MypurschasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
