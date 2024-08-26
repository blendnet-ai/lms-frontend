import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (window.pageYOffset > 400) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <IconButton
      aria-label="scroll"
      size="large"
      sx={{
        display: showScroll ? 'flex' : 'none',
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1000,
        backgroundColor: "#2059EE",
        color: "white",
        '&:hover': {
          backgroundColor: "#2059EE",
        },
      }}
      onClick={handleScrollToTop}
    >
      <ArrowDropUpIcon />
    </IconButton>
  );
}
