import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  // Observable string sources
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor() { }

  notify() {
    // Notify any observers about the change in the cart
    this.subjectNotifier.next(null);
  }
}
