import { User } from "src/users/entities/user.entity";

export interface BiasRequest {
  title: string;
  description: string;
  currencyPair: string,
  userId: User;
  beforeImageUrl: string;
  afterImageUrl: string | null;
}
