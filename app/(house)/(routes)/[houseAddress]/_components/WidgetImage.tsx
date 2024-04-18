'use client';
import { Widget, WidgetTmp } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import { getPublicUrl } from '@/util/getPublicUrl';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface WidgetImageProps {
  widget?: Widget | WidgetTmp;
}

const WidgetImage = ({
  widget
}: WidgetImageProps) => {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);


  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (!widget?.image_array || widget.image_array.length === 0) {
    return (
      <div className='w-full h-full flex items-center justify-center rounded-md'>
        <ImageIcon className='text-gray-500' />
      </div>
    );
  }

  const slides = widget.image_array.map((image) => (getPublicUrl(`widget/${image}`)))

  if (slides.length === 1) {
    return (
      <div className='w-full h-full flex items-center justify-center bg-gray-100 relative'>
        <Image
          src={slides[0]}
          alt='widget'
          fill
        />
        {slides[0]}
      </div>
    );
  }

  return (
    <>
      <Carousel
        opts={{
          loop: true,

        }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        className='h-full relative'
      >
        <CarouselContent className='h-full'>
          {slides.map((image) => (
            <CarouselItem key={image} >
              <div
                className='w-full h-full bg-cover bg-no-repeat bg-center'
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </CarouselItem>
          ))}

        </CarouselContent>
        <div className='absolute bottom-2 left-1/2 -translate-x-1/2'>
          {count > 1 &&
            Array.from(Array(count).keys()).map((i) => (
              <Button
                key={i}
                className={`mx-1 w-2 h-2 flex-grow rounded-full p-0  ${i === current - 1
                  ? "bg-white hover:bg-white"
                  : "bg-neutral-600/75"
                  }`}
                onClick={() => api?.scrollTo(i)}
              />
            ))
          }
        </div>
      </Carousel>
    </>
  )

}

export default WidgetImage;