import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { SayHelloComponent } from './say-hello/say-hello.component';
import { CoreModule, CoreServicesModule, LayoutModule } from '@activia/ngx-components';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';

@NgModule({
  declarations: [
    SayHelloComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    CoreServicesModule.forRoot(),
    LayoutModule.forRoot(),
  ],
  providers: [
    { provide: NgZone, useFactory: () => new NgZone({}) },
  ],
  entryComponents: [
    SayHelloComponent
  ],
})
export class AppModule {
  constructor(private injector: Injector, private ngZone: NgZone) {
  }
  ngDoBootstrap() {
    const el = createCustomElement(SayHelloComponent, { injector: this.injector });
    customElements.define('app-say-hello', el);
   }

}
