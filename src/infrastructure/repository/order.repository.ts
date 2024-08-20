import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/order_item.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      })),
    }, {
      include: [{ model: OrderItemModel }],
    });
  }

  async update(order: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderModel.update({
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
      }, {
        where: { id: order.id },
        transaction,
      });

      await OrderItemModel.destroy({
        where: { orderId: order.id },
        transaction,
      });

      await OrderItemModel.bulkCreate(order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      })), {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ['items'],
    });

    const items = orderModel.items.map((item) => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.productId,
      item.quantity,
    ));

    return new Order(
      orderModel.id,
      orderModel.customerId,
      items,
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ['items'],
    });

    return orders.map((orderModel) => {
      const items = orderModel.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity,
      ));
      return new Order(
        orderModel.id,
        orderModel.customerId,
        items,
      );
    });
  }
}
