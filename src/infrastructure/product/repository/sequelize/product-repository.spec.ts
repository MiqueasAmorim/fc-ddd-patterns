import { Sequelize } from 'sequelize-typescript';
import ProductModel from './product.model';
import Product from '../../../../domain/product/entity/product';
import ProductRepository from './product.repository';

describe('Product repository tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });

    product.changeName('Product 2');
    product.changePrice(200);
    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(updatedProductModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    const foundProduct = await productRepository.find('1');

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);
    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product2);
    const product3 = new Product('3', 'Product 3', 300);
    await productRepository.create(product3);

    const products = [product, product2, product3];

    const foundProducts = await productRepository.findAll();

    expect(foundProducts).toEqual(products);
  });
});
