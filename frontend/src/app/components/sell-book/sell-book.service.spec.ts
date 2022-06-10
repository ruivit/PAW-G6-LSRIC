import { TestBed } from '@angular/core/testing';

import { SellBookService } from './sell-book.service';

describe('SellBookService', () => {
  let service: SellBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
