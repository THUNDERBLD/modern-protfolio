'use client';

import { useEffect } from 'react';

export default function CardtreeWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://thedouble.ai/embed/cardtree-widget.js';
    script.async = true;
    script.dataset.cardtreeWidget = '';
    script.dataset.slug = 'thunder';
    document.body.appendChild(script);

    return () => {
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        // Cleanup any DOM element the widget script might have injected
        const widgetContainer = document.getElementById('cardtree-widget-container');
        if (widgetContainer) {
          widgetContainer.remove();
        }
        const widgetIframe = document.querySelector('iframe[src*="cardtree"]');
        if (widgetIframe) {
          widgetIframe.remove();
        }
      } catch (e) {
        console.error('Error cleaning up Cardtree script:', e);
      }
    };
  }, []);

  return null;
}
