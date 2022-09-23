import { AIOPRealtimeBusiness } from './business/aiop-realtime.business';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';
import { WindwoProviders } from './business/windows/window.providers';

export const AIOPProviders = [
  AIOPRealtimeBusiness,
  VideoControlWindowBusiness,
  ...WindwoProviders,
];
