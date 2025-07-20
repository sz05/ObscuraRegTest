"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  brands: Brand[];
  imageHeight?: number;
}

export const BrandsGrid = React.forwardRef<HTMLDivElement, BrandsGridProps>(
  ({ 
    className,
    brands,
    imageHeight = 56, // 14 * 4 = 56px (h-14)
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10"
          >
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-center p-2 md:p-3 lg:p-4 xl:p-4">
                <div className="relative h-[100px] w-[120px] md:h-[160px] md:w-[180px] lg:h-[170px] lg:w-[180px] xl:h-[260px] xl:w-[280px]">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

BrandsGrid.displayName = "BrandsGrid";