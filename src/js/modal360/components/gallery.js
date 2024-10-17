import { Fancybox } from "@fancyapps/ui";
import setCopyRightTo from '@/modal360/components/copyRight/setCopytightTo';
import { addClassToAlter, removeClassToAlter } from '@/modal360/components/alterParentWindow';
Fancybox.defaults.Hash = false;

export function gallery() {
  Fancybox.bind("[data-fancybox='gallery']", {
    Image: {
      zoom: false,
    },
    on: {
      initLayout: () => {
        setCopyRightTo('.fancybox__carousel', false);
        addClassToAlter();
      },
      close: () => {
        removeClassToAlter();
      },
    }
  });
};

