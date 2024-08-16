import viewerInstance from '@/modal360/components/viewer/viewerInstance';
import { click } from '@/modal360/components/viewer/events/click';
import { ready } from '@/modal360/components/viewer/events/ready';
import { fullscreen } from '@/modal360/components/viewer/events/fullscreen';

export default function viewerEvents() {
  click();
  ready(viewerInstance);
  fullscreen(viewerInstance);
};




