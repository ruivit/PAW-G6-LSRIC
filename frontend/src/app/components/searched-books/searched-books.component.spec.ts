import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedBooksComponent } from './searched-books.component';

describe('SearchedBooksComponent', () => {
  let component: SearchedBooksComponent;
  let fixture: ComponentFixture<SearchedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
