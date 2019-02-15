import { Directive, ElementRef, Renderer } from '@angular/core';
import { Content } from "ionic-angular";
@Directive({
  selector: '[hide-fab]',
  host: {
    '(ionScroll)': 'handleScroll($event)'
  }
})
export class HideFabDirective {
  private fabsRef;
  private storedScroll: number = 0;
  private threshold: number = 0;

  constructor(public element: ElementRef, public renderer: Renderer) {
    // console.log('Hello HideFabDirective Directive');
  }

  ngAfterViewInit() {
    // console.log("All Transtition set");
    this.fabsRef = this.element.nativeElement.getElementsByClassName("fab");
    for (let i = 0; i < this.fabsRef.length; i++) {
      const fab = this.fabsRef[i];
      this.renderer.setElementStyle(fab, 'webkitTransition', 'transform 500ms,top 500ms');
    }
  }

  handleScroll(event: Content) {
    if (event.scrollTop - this.storedScroll > this.threshold) {
      // console.log("Scrolling down");
      for (let i = 0; i < this.fabsRef.length; i++) {
        const fab = this.fabsRef[i];
        this.renderer.setElementStyle(fab, 'top', '60px');
        this.renderer.setElementStyle(fab, 'webkitTransform', 'scale3d(.1,.1,.1)');
      }
    } else if (event.scrollTop - this.storedScroll < 0) {
      // console.log("Scrolling up");
      for (let i = 0; i < this.fabsRef.length; i++) {
        const fab = this.fabsRef[i];
        this.renderer.setElementStyle(fab, 'top', '0');
        this.renderer.setElementStyle(fab, 'webkitTransform', 'scale3d(1,1,1)');
      }
    }
    // console.log(event.scrollTop - this.storedScroll);
    this.storedScroll = event.scrollTop;
  }
}