import UserInterface from './UserInterface';
import ShipperInterface from './ShipperInterface';
import OrderItemInterface from './OrderItemInterface';
import OrderStatusInterface from './OrderStatusInterface';

export default interface OrderInterface {
  id: number,
  user: UserInterface,
  shipper: ShipperInterface,
  orderItems: Array<OrderItemInterface>,
  orderStatus: OrderStatusInterface,
  createdAt?: string,
  updatedAt?: string
}