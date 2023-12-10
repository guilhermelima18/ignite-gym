export type History = {
  title: string;
  data: {
    id: number;
    user_id: number;
    exercise_id: number;
    name: string;
    group: string;
    created_at: Date;
    hour: string;
  }[];
};
