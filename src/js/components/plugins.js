import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { Fancybox } from "@fancyapps/ui";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export function plugins() {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
  window.ScrollToPlugin = ScrollToPlugin;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  window.Fancybox = Fancybox;
  window.THREE = THREE;
  window.GLTFLoader = GLTFLoader;
}
