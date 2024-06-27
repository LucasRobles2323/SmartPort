import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  @Input() title!: string;

  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.location.back();
  }

}
