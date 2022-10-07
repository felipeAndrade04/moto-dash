export interface ChartData {
  name: string;
  data: number[];
}

export interface OrderChatProps {
  isLoading: boolean
  graphData: ChartData[]
}