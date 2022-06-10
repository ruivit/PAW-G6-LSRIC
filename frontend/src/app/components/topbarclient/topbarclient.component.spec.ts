import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarclientComponent } from './topbarclient.component';

describe('TopbarclientComponent', () => {
  let component: TopbarclientComponent;
  let fixture: ComponentFixture<TopbarclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
