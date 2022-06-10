import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  subjectNotifier: Subject<null> = new Subject<null>();

  constructor() { }

  notify() {
    this.subjectNotifier.next(null);
  }
}
