import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysoldbooksComponent } from './mysoldbooks.component';

describe('MysoldbooksComponent', () => {
  let component: MysoldbooksComponent;
  let fixture: ComponentFixture<MysoldbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysoldbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysoldbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
