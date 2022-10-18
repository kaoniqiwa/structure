import { Component, OnInit } from '@angular/core';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { RegionTreeSource } from 'src/app/components/region-tree/region-tree.converter';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { SelectItem } from 'src/app/models/select-control.model';

@Component({
  selector: 'region-node-match',
  templateUrl: './region-node-match.component.html',
  styleUrls: ['./region-node-match.component.less'],
})
export class RegionNodeMatchComponent implements OnInit {
  selectStrategy = SelectStrategy.Multiple;
  
  constructor() {}

  ngOnInit(): void {}

  selectTreeNode(nodes: CommonFlatNode<RegionTreeSource>[]) {
    console.log('外部结果', nodes);
  }
}
