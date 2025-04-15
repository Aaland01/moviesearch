import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// https://v5.reactrouter.com/web/guides/scroll-restoration
const NavigationReset = () => {
  
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ 
      top: 0,  
      behavior: 'instant'
    }); 
  }, [pathname])

  return
};

export default NavigationReset;
