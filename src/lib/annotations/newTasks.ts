import { Priority } from "./priority";

export default interface NewTask {
  title: string,
  body: string,
  priority: Priority | null,
  due?: string;
}
