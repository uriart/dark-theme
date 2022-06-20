import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { distinctUntilChanged, filter, fromEvent, map, pairwise, share, throttleTime } from 'rxjs';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'dark-theme';

  private isVisible = true;

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    //TODO Aplicar la animación solo al header
    return VisibilityState.Visible;
    //return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  ngAfterViewInit() {
    let container = document.querySelectorAll("#main");
    let element = document.getElementById("main");
    const scroll$ = fromEvent(container, 'scroll').pipe(
      throttleTime(10),
      map(() =>  null!= element && element.scrollTop),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    scrollUp$.subscribe(() => (this.isVisible = true));
    scrollDown.subscribe(() => (this.isVisible = false));
  }


}
