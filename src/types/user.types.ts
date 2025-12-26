export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // Add other user properties as needed based on your API response
}

export interface UsersResponse {
  data: User[];
}
