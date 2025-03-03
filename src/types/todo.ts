export type Priority = "low" | "medium" | "high";
export type Status = "new" | "in_progress" | "done";

export interface TaskType {
    id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
}
