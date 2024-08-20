import CustomerRepository from '../../infrastructure/repository/customer.repository';
import Address from '../entity/address';
import Customer from '../entity/customer';
import EventDispatcher from '../event/@shared/event-dispatcher';
import CustomerAddressChangedEvent from '../event/customer/customer-address-changed.event';
import CustomerCreatedEvent from '../event/customer/customer-created.event';
import CustomerAddressChangedHandler from '../event/customer/handler/customer-address-changed.handler';
import CustomerCreatedHandler1 from '../event/customer/handler/customer-created.handler1';
import CustomerCreatedHandler2 from '../event/customer/handler/customer-created.handler2';
import CustomerService from './customer.service';

jest.mock('../../infrastructure/repository/customer.repository');

describe('Customer service unit tests', () => {
  it('should emit a customer created event', async () => {
    const customerRepository = new CustomerRepository();
    const customerRepositorySpy = jest.spyOn(customerRepository, 'create');
    const eventDispatcher = new EventDispatcher();

    const customerCreatedHandler1 = new CustomerCreatedHandler1();
    const customerCreatedHandlerSpy = jest.spyOn(customerCreatedHandler1, 'handle');

    const customerCreatedHandler2 = new CustomerCreatedHandler2();
    const customerCreatedHandler2Spy = jest.spyOn(customerCreatedHandler2, 'handle');

    eventDispatcher.register(CustomerCreatedEvent.name, customerCreatedHandler1);
    eventDispatcher.register(CustomerCreatedEvent.name, customerCreatedHandler2);

    const customerService = new CustomerService(customerRepository, eventDispatcher);

    await customerService.createCustomer('Customer 1');

    expect(customerRepositorySpy).toHaveBeenCalledTimes(1);
    expect(customerCreatedHandlerSpy).toHaveBeenCalledTimes(1);
    expect(customerCreatedHandler2Spy).toHaveBeenCalledTimes(1);
  });

  it('should emit a customer address changed event', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.addAddress(address);
    customer.clearDomainEvents();

    customerRepository.find = jest.fn().mockReturnValue(customer);

    const eventDispatcher = new EventDispatcher();

    const customerAddressChangedHandler = new CustomerAddressChangedHandler();
    const customerAddressChangeHandlerSpy = jest.spyOn(customerAddressChangedHandler, 'handle');

    eventDispatcher.register(CustomerAddressChangedEvent.name, customerAddressChangedHandler);

    const customerService = new CustomerService(customerRepository, eventDispatcher);

    await customerService.changeCustomerAddress('1', 'Street 2', 2, 'Zipcode 2', 'City 2');

    expect(customerRepository.find).toHaveBeenCalledTimes(1);
    expect(customerRepository.update).toHaveBeenCalledTimes(1);
    expect(customerAddressChangeHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
