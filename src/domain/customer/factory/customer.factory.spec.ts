import Customer from '../entity/customer';
import Address from '../value-object/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John');

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBeUndefined();
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
    expect(customer.getDomainEvents()).toHaveLength(0);
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    const customer = CustomerFactory.createWithAddress('John', address);

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
    expect(customer.getDomainEvents()).toHaveLength(0);
  });
});
