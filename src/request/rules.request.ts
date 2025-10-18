export interface RuleInterface {
  id: string;
  email: string;
  title: string; // Will be hashed in service layer
  expression: string;
  createdAt: Date;
}
