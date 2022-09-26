import { IndexRealtimeBusiness } from './business/index-realtime.business';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';
import { WindwoProviders } from './business/windows/window.providers';

export const IndexProviders = [
  IndexRealtimeBusiness,
  VideoControlWindowBusiness,
  ...WindwoProviders,
];
