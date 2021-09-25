// import resorceses from node-modules
import {
  gsap,
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
  ScrollToPlugin,
  TweenLite,
  TweenMax,
  CSSPlugin,
  EasePack,
  Expo,
} from "gsap/all";

TweenMax.to(".overlay-1-1", 1, {
  left: "-100%",
  ease: Expo.easeInOut,
});

TweenMax.to(".overlay-1-2", 1, {
  delay: 0.4,
  left: "-100%",
  ease: Expo.easeInOut,
});
