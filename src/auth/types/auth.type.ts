export interface CreatedUserInput {
  username: string;
  email: string;
  password: string;
}
export type CreatedUserResponse = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
};
