import { randomUUID } from 'node:crypto';
import OrderFactory from './order.factory';

describe('Order factory unit tests', () => {
  it('should create an order', () => {
    const orderProps = {
      id: randomUUID(),
      customerId: randomUUID(),
      items: [
        {
          id: randomUUID(),
          name: 'Product 1',
          price: 100,
          productId: randomUUID(),
          quantity: 1,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items).toHaveLength(1);
  });
});
