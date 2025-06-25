import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageCarousel = ({ image }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
  plugins={[plugin.current]}
  className="w-full h-[300px]"
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
>
  <CarouselContent className="h-full z-1">
    {image?.map((i, index) => (
      <CarouselItem key={index} className="h-full">
        <Card className="h-full w-full border-none p-0">
          <CardContent className="h-full w-full p-0 flex items-center justify-center">
            <img
              src={i}
              alt="Project Screenshot"
              className="h-full w-full object-cover rounded-md"
              style={{ objectPosition: "center", maxHeight: "100%" }}
            />
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
  );
};

export default ImageCarousel;
