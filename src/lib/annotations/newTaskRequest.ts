
export default interface NewTaskRequest {
  pending: boolean;
  completed: boolean;
  err?: string;
  code: number;
}
