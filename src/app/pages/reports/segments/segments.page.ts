import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.page.html',
  styleUrls: ['./segments.page.scss'],
})
export class SegmentsPage  {

  constructor(private router: Router,) { }

  seg1() {
    this.router.navigate(['/segments/seg1']);
  }
  seg2() {
    this.router.navigate(['/segments/seg2']);
  }
  seg3() {
    this.router.navigate(['/segments/seg3']);
  }
  seg4() {
    this.router.navigate(['/segments/seg4']);
  }

  seg5() {
    this.router.navigate(['/segments/seg5']);
  }
  seg6() {
    this.router.navigate(['/segments/seg6']);
  }

  seg7(){
    this.router.navigate(['/segments/seg7']);
  }

}
