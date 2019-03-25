import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { LayoutService } from '@activia/ngx-components';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-say-hello',
  templateUrl: './say-hello.component.html',
  styleUrls: ['./say-hello.component.css'],
  encapsulation: ViewEncapsulation.Native,
})
export class SayHelloComponent implements OnInit, OnDestroy {

  @Input() name: string;

  @Output() hello: EventEmitter<string> = new EventEmitter();

  componentDestroyed$: Subject<void> = new Subject();

  log = '';

  constructor(
    private layoutService: LayoutService,
  ) { }

  ngOnInit() {
    //
    this.layoutService.deviceInfo$.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((r) => {
      this.log += `/n device type ${r.deviceType}`;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  sayHello(): void {
    this.hello.emit('hello ' + this.name);
  }

}
