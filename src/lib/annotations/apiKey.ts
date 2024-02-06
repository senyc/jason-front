export default interface apiKey {
  id: string;
  label: string;
  description?: string;
  lastAccessed?: string | null;
  creationDate: string;
  expiration: string;
}
