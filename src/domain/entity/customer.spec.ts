import CustomerAddressChangedEvent from '../event/customer/customer-address-changed.event';
import CustomerCreatedEvent from '../event/customer/customer-created.event';
import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Customer('', 'John')).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('123', '')).toThrow('Name is required');
  });

  it('should create customer without event', () => {
    // Arrange & Act
    const customer = new Customer('123', 'John');

    // Assert
    expect(customer.id).toBe('123');
    expect(customer.name).toBe('John');
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
    expect(customer.address).toBeUndefined();
    expect(customer.getDomainEvents().length).toBe(0);
  });

  it('should create customer with event', () => {
    // Arrange & Act
    const customer = Customer.create('John');

    // Assert
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
    expect(customer.address).toBeUndefined();
    expect(customer.getDomainEvents().length).toBe(1);
    expect(customer.getDomainEvents()[0]).toBeInstanceOf(CustomerCreatedEvent);
    expect(customer.getDomainEvents()[0].dateTimeOccurred).toBeInstanceOf(Date);
    expect(customer.getDomainEvents()[0].eventData).toStrictEqual({
      id: customer.id,
      name: 'John',
    });
  });

  it('should change name', () => {
    // Arrange
    const customer = new Customer('123', 'John');

    // Act
    customer.changeName('Jane');

    // Assert
    expect(customer.name).toBe('Jane');
  });

  it('should add address', () => {
    const customer = new Customer('1', 'Customer 1');

    expect(customer.address).toBeUndefined();

    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.addAddress(address);

    expect(customer.address).toBe(address);
  });

  it('should change address', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.addAddress(address);

    const newAddress = new Address('Street 2', 456, '13330-250', 'São Paulo');
    customer.changeAddress(newAddress);

    expect(customer.address).toBe(newAddress);

    expect(customer.getDomainEvents()).toHaveLength(1);
    expect(customer.getDomainEvents()[0]).toBeInstanceOf(CustomerAddressChangedEvent);
    expect(customer.getDomainEvents()[0].dateTimeOccurred).toBeInstanceOf(Date);
    expect(customer.getDomainEvents()[0].eventData).toStrictEqual({
      id: '1',
      name: 'Customer 1',
      address: newAddress.toJSON(),
    });
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.addAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrow('Address is mandatory to activate a customer');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it('should add an domain event when customer is created', () => {
    const customer = Customer.create('Customer 1');
    expect(customer.getDomainEvents().length).toBe(1);
    expect(customer.getDomainEvents()[0]).toBeInstanceOf(CustomerCreatedEvent);
  });
});
