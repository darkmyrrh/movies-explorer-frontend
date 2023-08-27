import { useState, useEffect } from "react";
import {
  SCREEN_LARGE,
  SCREEN_MEDIUM,
  SCREEN_SMALL,
} from "../utils/constants";

function useResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isScreenSmall: width >= SCREEN_SMALL,
    isScreenMedium: width >= SCREEN_MEDIUM,
    isScreenLarge: width >= SCREEN_LARGE,
  };
}

export default useResize;
