import Order from '../entity/order';
import OrderItem from '../entity/order_item';

type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[]
};

export default class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.productId,
      item.quantity,
    ));

    return new Order(props.id, props.customerId, items);
  }
}
