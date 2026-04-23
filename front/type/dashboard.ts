export type Settlement = {
  winery: string;
  gross: number;
  commission: number;
  iva: number;
  net: number;
};

export type ClientRanking = {
  name: string;
  total: number;
};

export type SellerPerformance = {
  name: string;
  total: number;
  percentage: number;
};
