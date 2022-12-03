import { AfterContentChecked, Component, ViewChild, ViewEncapsulation, } from '@angular/core';
import { SwiperComponent} from 'swiper/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InicioPage implements AfterContentChecked {
  @ViewChild('swiper') swiper!: SwiperComponent;

  constructor() { }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  touchAllowed=false;

  next () {
    this.swiper.swiperRef.slideNext(500);
  }

  prev () {
    this.swiper.swiperRef.slidePrev(500);
  }

  toggleTouch() {
    this.touchAllowed = !this.touchAllowed;
    this.swiper.swiperRef.allowTouchMove= this.touchAllowed
  }

}
