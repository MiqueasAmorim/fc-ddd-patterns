import Product from '../entity/product';
import ProductB from '../entity/product-b';
import ProductFactory from './product.factory';

describe('Product factory unit tests', () => {
  it('should create a product A', () => {
    const product = ProductFactory.create('a', 'Product A', 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(100);
    expect(product).toBeInstanceOf(Product);
  });

  it('should create a product B', () => {
    const product = ProductFactory.create('b', 'Product B', 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(200);
    expect(product).toBeInstanceOf(ProductB);
  });

  it('should throw an error when product type is not supported', () => {
    expect(() => ProductFactory.create('c', 'Product C', 100))
      .toThrow('Product type not supported');
  });
});
