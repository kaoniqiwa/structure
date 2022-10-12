import { CustomDateItemPipe } from './custom-date-item.pipe';
import { DateTimePipe } from './date-time.pipe';
import { EventTypePipe } from './event-type.pipe';
import { NamePipe } from './name.pipe';
import { OnlineStatusPipe } from './online-status.pipe';
import { PercentagePipe } from './percentage.pipe';
import { ResourceTypePipe } from './resource-type.pipe';
import { StyleUrlPipe } from './style-url.pipe';

export const Pipes = [
  CustomDateItemPipe,
  PercentagePipe,
  EventTypePipe,
  DateTimePipe,
  StyleUrlPipe,
  OnlineStatusPipe,
  NamePipe,
  ResourceTypePipe,
];
