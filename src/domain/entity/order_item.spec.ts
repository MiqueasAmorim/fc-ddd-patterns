import OrderItem from './order_item';

describe('OrderItem unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new OrderItem('', 'Product 1', 100, 'p1', 2)).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new OrderItem('123', '', 100, 'p1', 2)).toThrow('Name is required');
  });

  it('should throw error when price is less or equal than zero', () => {
    expect(() => new OrderItem('123', 'Product 1', -1, 'p1', 2)).toThrow('Price must be greater than zero');
    expect(() => new OrderItem('123', 'Product 1', 0, 'p1', 2)).toThrow('Price must be greater than zero');
  });

  it('should throw error when productId is empty', () => {
    expect(() => new OrderItem('123', 'Product 1', 100, '', 2)).toThrow('ProductId is required');
  });

  it('should throw error when quantity is less or equal than zero', () => {
    expect(() => new OrderItem('123', 'Product 1', 100, 'p1', -1)).toThrow('Quantity must be greater than zero');
    expect(() => new OrderItem('123', 'Product 1', 100, 'p1', 0)).toThrow('Quantity must be greater than zero');
  });
});
