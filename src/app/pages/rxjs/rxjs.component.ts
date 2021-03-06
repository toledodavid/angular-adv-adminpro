import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSub: Subscription;

  constructor() {

    // this.returnObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   value => console.log('Subs: ', value),
    //   err => console.warn('Error: ', err),
    //   () => console.log('Obs finishsed')
    // );

    this.intervalSub = this.returnInterval().subscribe(value => {
      console.log(value);
    })

  }

  ngOnDestroy() {
    this.intervalSub.unsubscribe();
  }


  returnInterval(): Observable<number> {
    const interval$ = interval(500).pipe(
      //take(10),
      map(value => value + 1),
      filter(value => (value % 2 === 0) ? true : false)
    );
    return interval$;
  }


  returnObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {

      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('i is 2');
        }

      }, 1000);
    });

    return obs$;
  }

}
