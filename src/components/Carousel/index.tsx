import { Flex } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { PropsWithChildren } from 'react';
import Carousel, { CarouselProps } from 'react-multi-carousel';

type CarouselBreakpoint = { max: number; min: number };
type CarouselDeviceType = 'superLargeDesktop' | 'desktop' | 'tablet' | 'mobile';
type CarouselConfigType = { breakpoint: CarouselBreakpoint; items: number; slidesToSlide?: number };

const defaultConfig: Record<CarouselDeviceType, CarouselConfigType> = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

interface IAppCarouselProps {
  itemsByDevice?: Partial<Record<CarouselDeviceType, number>>;
}

export const AppCarousel: React.FC<PropsWithChildren & IAppCarouselProps & Partial<CarouselProps>> = ({ children, itemsByDevice = {}, ...props }) => {
  const config = { ...defaultConfig, ...props.responsive };
  Object.keys(itemsByDevice).forEach((k) => {
    const key = k as CarouselDeviceType;
    config[key] = { ...config[key], items: itemsByDevice[key] || config[key].items };
  });
  return (
    <Carousel
      responsive={config}
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customRightArrow={
        <Flex
          className="arrow right"
          position="absolute"
          right="0"
          zIndex="9999"
          top="50%"
          transform="translate(0, -50%)"
          borderRadius="50%"
          bg="#00000077"
          color="white"
          p="0.35rem"
        >
          <IoIosArrowForward />
        </Flex>
      }
      customLeftArrow={
        <Flex
          className="arrow left"
          position="absolute"
          left="0"
          zIndex="9999"
          top="50%"
          transform="translate(0, -50%)"
          borderRadius="50%"
          bg="#00000077"
          color="white"
          p="0.35rem"
        >
          <IoIosArrowBack />
        </Flex>
      }
      {...props}
    >
      {children}
    </Carousel>
  );
};
