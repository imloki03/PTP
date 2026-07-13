export const JOURNEY_STATUS_VALUES = ['PLANNING', 'IN_PROGRESS', 'FINISHED'] as const;

export type JourneyStatus = (typeof JOURNEY_STATUS_VALUES)[number];
