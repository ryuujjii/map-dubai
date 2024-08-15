import { viewerInstance } from '@/modal360/components/viewer/viewer_instance';
import { click } from '@/modal360/components/viewer/events/click';
import { ready } from '@/modal360/components/viewer/events/ready';
import { fullscreen } from '@/modal360/components/viewer/events/fullscreen';

export function handleEvents() {
  click(viewerInstance);
  ready(viewerInstance);
  fullscreen(viewerInstance);
};




