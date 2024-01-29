export const orderStatuses = <const>[`pending`, `preparing`, `in_delivery`, `finished`];

export type OrderStatusType = (typeof orderStatuses)[number];
