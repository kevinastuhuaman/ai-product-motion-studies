import motionSpec from "./motion-spec.json";

export type StudyState = (typeof motionSpec.studies)[number]["states"][number];
export type MotionStudy = (typeof motionSpec.studies)[number];

export const studies = motionSpec.studies;
export { motionSpec };

