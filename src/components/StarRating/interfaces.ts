import { FlexProps } from '@chakra-ui/react';

export interface IStarRatingProps extends Omit<FlexProps, `onChange`> {
  rating: number;
  onChange?: (rating: number) => void;
}

export type StarRatingType = { fill: `full` | `half` | `empty` };
