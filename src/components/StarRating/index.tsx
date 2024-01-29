import { useEffect, useState } from 'react';
import { IStarRatingProps, StarRatingType } from './interfaces';
import { Flex } from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';

export const StarRating: React.FC<IStarRatingProps> = ({ onChange, rating, ...rest }) => {
  const [stars, setStars] = useState<StarRatingType[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 5 }, (_, i) => ({ fill: i + 1 <= rating ? `full` : rating > i ? `half` : `empty` })));
  }, [rating]);

  return (
    <Flex color="primary400" {...rest}>
      {stars.map((star, i) =>
        star.fill === `full` ? (
          <Flex key={star.fill + i} onClick={() => onChange && onChange(i + 1)}>
            <FaStar />
          </Flex>
        ) : star.fill === `half` ? (
          <Flex key={star.fill + i} onClick={() => onChange && onChange(i + 1)}>
            <FaStarHalfAlt />
          </Flex>
        ) : (
          <Flex key={star.fill + i} onClick={() => onChange && onChange(i + 1)}>
            <FaRegStar />
          </Flex>
        ),
      )}
    </Flex>
  );
};
