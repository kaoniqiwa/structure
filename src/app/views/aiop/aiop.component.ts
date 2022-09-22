import { Component, OnInit } from '@angular/core';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';

@Component({
  selector: 'app-aiop',
  templateUrl: './aiop.component.html',
  styleUrls: ['./aiop.component.less'],
})
export class AiopComponent implements OnInit {
  NavigationPath = NavigationPath;

  title: string = '';
  path = NavigationPath.realtime;

  constructor() {}

  ngOnInit(): void {}
  onnavigate(path: NavigationPath) {
    this.path = path;
  }
}
