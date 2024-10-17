import { dispatchCustomEvent } from 'utils';
import setCloseBtnTitle from '@/projects/components/content/setCloseBtnTitle';

function getDataToModal360Fn() {
  let content = null;
  const iframeWindow = document.querySelector('.modal360 iframe');

  window.addEventListener("update-modal360-media", (e) => {
    sendMediaToModal360(e.detail.dataModal360);
  });

  function sendMediaToModal360(dataModal360) {
    dispatchCustomEvent({
      el: iframeWindow.contentWindow, event: "modal360-media", detail: {
        media: content.media[dataModal360],
        floorplan: content.media[dataModal360].floorplan,
      }
    });
    setCloseBtnTitle({ title: "dsadasd", type: "dasdasdsa" })
  }
  function sendFloorplanToModal360(dataModal360) {
    dispatchCustomEvent({
      el: iframeWindow.contentWindow, event: "modal360-floorplan", detail: {
        floorplan: content.media[dataModal360].floorplan,
      }
    });
  }
  function sendFloorplansToModal360() {
    dispatchCustomEvent({
      el: iframeWindow.contentWindow, event: "modal360-floorplans", detail: {
        floorplans: content.floorplans
      }
    });
  }
  function getDataToModal360(data) {
    content = data;
  }

  return { sendMediaToModal360, sendFloorplansToModal360, sendFloorplanToModal360, getDataToModal360, iframeWindow };
}

export const { getDataToModal360, sendMediaToModal360, sendFloorplansToModal360, sendFloorplanToModal360, iframeWindow } = getDataToModal360Fn();