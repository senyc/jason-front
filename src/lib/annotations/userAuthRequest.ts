export default interface UserAuthRequest {
  pending: boolean;
  completed: boolean;
  err?: string;
  jwt?: string;
}
