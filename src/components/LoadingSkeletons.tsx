
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const HeroSkeleton = () => (
  <section className="min-h-screen flex items-center justify-center pt-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <Skeleton className="h-8 w-96 mx-auto mb-8" />
        <Skeleton className="h-16 w-full mb-6" />
        <Skeleton className="h-8 w-3/4 mx-auto mb-8" />
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="glass-premium p-6">
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-32" />
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="glass-premium">
              <Skeleton className="aspect-square" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const FeaturesSkeleton = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-96 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="glass-premium p-8">
            <Skeleton className="w-12 h-12 mb-6" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export const GallerySkeleton = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-80 mx-auto mb-6" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="glass-premium">
            <Skeleton className="aspect-square" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
