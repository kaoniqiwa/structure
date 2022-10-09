import { Duration } from 'src/app/models/duration.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class StructuredDataQueryModel {
  constructor() {
    this.duration = DateTimeTool.allDay(new Date());
  }
  cameraIds: string[] = [];
  duration: Duration;
}
