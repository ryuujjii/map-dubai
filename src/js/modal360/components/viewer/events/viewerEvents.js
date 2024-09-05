import viewerInstance from '@/modal360/components/viewer/viewerInstance';
import { click } from '@/modal360/components/viewer/events/click';
import { ready } from '@/modal360/components/viewer/events/ready';
import { fullscreen } from '@/modal360/components/viewer/events/fullscreen';
import loadProgress from '@/modal360/components/viewer/events/loadProgress';

export default function viewerEvents() {
  loadProgress(viewerInstance)
  click();
  ready(viewerInstance);
  fullscreen(viewerInstance);
};




