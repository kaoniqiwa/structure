import { IndexEventTriggerBusiness } from './business/index-event-trigger.business';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';
import { WindowProviders } from './business/windows/window.providers';

export const IndexProviders = [
  VideoControlWindowBusiness,
  IndexEventTriggerBusiness,
  ...WindowProviders,
];
