import { LinePerRecord } from 'src/app/enums/line-per-record.enum';

export class CommonDetailModel {
  Title!: string;
  ImageUrl!: string;
  BackgroundImageUrl!: string;
  ContainerWidth!: number;
  ContainerHeight!: number;
  LeftWidth!: number;
  // RightWidth!: number;
  LinePerRecord!: LinePerRecord;
  Records!: CommonDetailRecord[];
}
export class CommonDetailRecord {
  Icon!: string;
  PropertyDes!: string;
  PropertyValue!: string;
}
