export interface TradeRequest {
  symbol: string;

  entryPrice: number;

  exitPrice: number;

  quantity: number;

  profitLoss: number;

  strategy: string;

  session: "London" | "New York" | "Asia";

  dailyBias: string;

  tradeDirection: 'Buy' | 'Sell';

  result: boolean;

  risk: string;

  reward: string;

  entryTimeframe: string;

  entryStructure: string;

  entrySetup: string;

  notes: string;

  error: boolean;

  errorReason: string;

  screenshotUrl: string;
}
