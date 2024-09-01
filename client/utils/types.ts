export interface Resource {
  id: string;
  name: string;
  type: string;
  color: string;
}

export interface Schedule {
  id: string;
  resourceId: string;
  teacher: string;
  day: string;
  time: string;
}

export interface Conflict {
  resourceId: string;
  day: string;
  time: string;
}
