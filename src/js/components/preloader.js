/**
 ** data-preload="url"
 ** data-preload-query="991.98, max"
 */
import 'latest-createjs/lib/preloadjs/preloadjs.js';
import {dragHandFn} from '@/sections/map'

import {
  queryMatches,
  addClassName,
  removeClassName,
  dispatchCustomEvent,
} from 'utils';
export async function preloader(cb) {
  // lenisScroll.stop();
  addClassName(document.documentElement, 'loading');
  const mediaToLoad = getSortedMediaElements();
  if (!mediaToLoad.length) {
    commonInstructions(cb);
    dispatchCustomEvent({
      el: window,
      event: 'media-loading',
      detail: { progress: 1 },
    });
    return;
  }
  try {
    const loadedMedia = await getLoadedMedia(getLoadMediaSrc(mediaToLoad));
    setLoadedMedia(loadedMedia, mediaToLoad);
  } catch (error) {
    dispatchCustomEvent({
      el: window,
      event: 'media-loading',
      detail: { progress: 1 },
    });
    console.log(error);
  }
  commonInstructions(cb);
}

async function getLoadedMedia(obj) {
  return new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true, null, true);
    queue.on('progress', async (e) => {
      dispatchCustomEvent({
        el: window,
        event: 'media-loading',
        detail: { progress: e.loaded },
      });
    });

    queue.on('complete', () => {
      const urls = obj.reduce((acc, img) => {
        acc[img.id] = URL.createObjectURL(queue.getResult(img.id, true));
        return acc;
      }, {});
      resolve(urls);
    });
    queue.on('error', (error) => {
      reject(error);
    });
    queue.loadManifest(obj);
  });
}

function getSortedMediaElements() {
  const mediaElements = [...document.querySelectorAll('[data-preload]')];
  if (!mediaElements.length) {
    return [];
  }

  const trash = [];
  const sortedMediaElements = mediaElements.filter((mediaElement) => {
    const mediaQuery = mediaElement.getAttribute('data-preload-query');
    if (mediaQuery) {
      const [viewport, constraint] = mediaQuery
        .split(',')
        .map((el) => el.trim());
      const matches = queryMatches(viewport, constraint);
      !matches ? trash.push(mediaElement) : null;
      return matches;
    }
    return true;
  });

  trash.forEach((el) => (el.style.display = 'none'));

  return sortedMediaElements;
}

// Script for SAFARI Mobile
function validVideo() {}

function setLoadedMedia(loadedMedia, mediaToLoad) {
  mediaToLoad.forEach((node, i) => {
    const nodeType = node.tagName;
    node.src = loadedMedia[`${i}-${nodeType}`];
  });
}

function getLoadMediaSrc(medias) {
  const res = medias.map((item, i) => {
    const nodeType = item.tagName;
    return new createjs.LoadItem().set({
      id: `${i}-${nodeType}`,
      src: item.getAttribute('data-preload'),
      type: createjs.AbstractLoader.BLOB,
    });
  });
  return res;
}

function commonInstructions() {
  setTimeout(() => {
    dispatchCustomEvent({ el: window, event: 'media-loaded' });
    removeClassName(document.documentElement, 'loading');
    addClassName(document.documentElement, 'loaded');
    addClassName(document.documentElement, 'preloader-hidden');
    // lenisScroll.start();
    // ScrollTrigger.refresh(true);
  }, 500);
  setTimeout(() => {
    dragHandFn()
  }, 1000);

  validVideo();
}
