export interface IStarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
}

export type StarRatingType = { fill: `full` | `half` | `empty` };
