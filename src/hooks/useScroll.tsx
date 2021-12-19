import { useRef } from "react";

const useScroll = () => {
  const scrollSpeed = useRef<number>();

  var checkScrollSpeed = (function () {
    var lastPos: number | null,
      newPos: number,
      timer: NodeJS.Timeout,
      delta: number,
      delay = 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function () {
      newPos = window.scrollY;
      if (lastPos != null) {
        // && newPos < maxScroll
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  // listen to "scroll" event
  window.onscroll = function () {
    scrollSpeed.current = checkScrollSpeed();
  };

  return { scrollSpeed: scrollSpeed.current };
};

export default useScroll;
