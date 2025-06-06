
import { useState, useRef, useEffect, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  disabled?: boolean;
}

const PullToRefresh = ({ 
  children, 
  onRefresh, 
  threshold = 100,
  disabled = false 
}: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled || window.scrollY > 0) return;
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (disabled || isRefreshing || window.scrollY > 0) return;

    currentYRef.current = e.touches[0].clientY;
    const pullDistance = Math.max(0, currentYRef.current - startYRef.current);
    
    if (pullDistance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(pullDistance, threshold * 1.5));
      setCanRefresh(pullDistance >= threshold);
    }
  };

  const handleTouchEnd = async () => {
    if (disabled || isRefreshing) return;

    if (canRefresh && pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
        setCanRefresh(false);
      }
    }
    
    setPullDistance(0);
    setCanRefresh(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canRefresh, pullDistance, threshold, disabled, isRefreshing]);

  const pullProgress = Math.min(pullDistance / threshold, 1);
  const rotation = pullProgress * 180;

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull to refresh indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 ease-out glass-premium border-b border-purple-500/20"
        style={{
          height: Math.max(0, pullDistance * 0.8),
          transform: `translateY(-${Math.max(0, 60 - pullDistance * 0.8)}px)`,
          opacity: pullDistance > 20 ? 1 : 0
        }}
      >
        <div className="flex items-center space-x-2 text-purple-400 font-inter">
          <RefreshCw
            className={`w-5 h-5 transition-transform duration-200 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${rotation}deg)`
            }}
          />
          <span className="text-sm font-medium">
            {isRefreshing
              ? 'Refreshing...'
              : canRefresh
              ? 'Release to refresh'
              : 'Pull to refresh'
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${pullDistance * 0.3}px)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
