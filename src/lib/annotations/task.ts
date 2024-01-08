import { Priority } from "./priority";

export default interface Task {
  id: number,
  title: string,
  body?: string,
  priority: Priority,
  due: string | null;
  completed?: boolean;
  completedDate?: string;
}
