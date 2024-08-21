import { randomUUID } from 'node:crypto';
import Order from '../entity/order';
import Customer from '../../customer/entity/customer';
import OrderItem from '../entity/order_item';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = new Order(randomUUID(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}
