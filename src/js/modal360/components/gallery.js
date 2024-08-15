import { Fancybox } from "@fancyapps/ui";
import setCopyRightTo from '@/modal360/components/copyRight/set_copytight_to';
import { addClassToAlter, removeClassToAlter } from '@/modal360/components/alter_parent_window';
Fancybox.defaults.Hash = false;

export function gallery() {
  Fancybox.bind("[data-fancybox]", {
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

