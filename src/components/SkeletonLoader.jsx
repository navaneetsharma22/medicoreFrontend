import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function SkeletonWrapper({ children }) {
  const isDark = document.documentElement.classList.contains('dark');
  
  return (
    <SkeletonTheme 
      baseColor={isDark ? '#1e293b' : '#e2e8f0'} 
      highlightColor={isDark ? '#334155' : '#f1f5f9'}
    >
      {children}
    </SkeletonTheme>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card rounded-3xl p-6 h-32 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <Skeleton circle width={40} height={40} />
        <Skeleton width={50} height={20} />
      </div>
      <div>
        <Skeleton width="40%" height={24} />
        <Skeleton width="60%" height={14} className="mt-2" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card rounded-3xl p-8 h-[400px] flex flex-col">
      <div className="mb-8">
        <Skeleton width="30%" height={24} />
        <Skeleton width="50%" height={14} className="mt-2" />
      </div>
      <div className="flex-1">
        <Skeleton height="100%" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 glass-card rounded-2xl">
          <Skeleton circle width={48} height={48} />
          <div className="flex-1">
            <Skeleton width="40%" height={16} />
            <Skeleton width="20%" height={12} className="mt-2" />
          </div>
          <Skeleton width={80} height={32} borderRadius={8} />
        </div>
      ))}
    </div>
  );
}
