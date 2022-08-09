import { IOrderDetails } from './order.interface';

export type TServerFeedMessage = {
  orders: Array<IOrderDetails>;
  total: number;
  totalToday: number;
  success?: boolean;
};