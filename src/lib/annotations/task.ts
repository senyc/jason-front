export default interface Task {
  id?: number,
  title: string,
  body?: string,
  priority?: number,
  due: string | null;
}
