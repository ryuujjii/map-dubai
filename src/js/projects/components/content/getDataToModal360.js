import { dispatchCustomEvent } from 'utils';
function getDataToModal360Fn() {
  let content = null;
  const iframeWindow = document.querySelector('.modal360 iframe');


  function sendDataToModal360(dataModal360) {
    const data = content.media[dataModal360];
    dispatchCustomEvent({
      el: iframeWindow.contentWindow, event: "modal360-content", detail: {
        media: data,
        floorplan: data.floorplan
      }
    });
  }
  function getDataToModal360(data) {
    content = data;
  }

  return { sendDataToModal360, getDataToModal360, iframeWindow };
}

export const { getDataToModal360, sendDataToModal360, iframeWindow } = getDataToModal360Fn();