import { Component, OnInit } from '@angular/core';
import { DeployType } from 'src/app/enums/deploy-type.enum';
import { Page, PagedList } from 'src/app/models/page-list.model';

@Component({
  selector: 'app-deploy-list',
  templateUrl: './deploy-list.component.html',
  styleUrls: ['./deploy-list.component.less'],
})
export class DeployListComponent implements OnInit {
  pagerCount = 4;
  pageIndex = 1;
  page: Page = {
    PageIndex: 1,
    PageSize: 9,
    PageCount: 3,
    RecordCount: 9,
    TotalRecordCount: 100,
  };
  constructor() {}
  path: DeployType = DeployType.face;
  DeployType = DeployType;

  ngOnInit(): void {}
  navigation(type: DeployType) {
    this.path = type;
  }
}
