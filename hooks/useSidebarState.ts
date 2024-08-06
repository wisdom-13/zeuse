import { useCallback, useState } from 'react';

export const useSidebarState = (isMobile: boolean) => {
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isMouseNavOver, setIsMouseNavOver] = useState(false);

  const resetWidth = useCallback((sidebarRef: React.RefObject<HTMLElement>, navbarRef: React.RefObject<HTMLElement>) => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.left = isMobile ? '100%' : '240px';

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile]);

  const collapse = useCallback((sidebarRef: React.RefObject<HTMLElement>, navbarRef: React.RefObject<HTMLElement>) => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.left = '0';

      setTimeout(() => setIsResetting(false), 300);
    }
  }, []);

  return {
    isResetting,
    isCollapsed,
    isMouseNavOver,
    setIsMouseNavOver,
    resetWidth,
    collapse,
  };
};