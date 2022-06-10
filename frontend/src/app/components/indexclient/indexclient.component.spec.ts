import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexclientComponent } from './indexclient.component';

describe('IndexclientComponent', () => {
  let component: IndexclientComponent;
  let fixture: ComponentFixture<IndexclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
