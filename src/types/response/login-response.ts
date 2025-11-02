export interface LoginResponse {
  "@odata.context": string;
  token: string;
  role: number;
  name: string;
  department: string;
}