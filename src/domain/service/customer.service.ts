import CustomerRepository from '../../infrastructure/repository/customer.repository';
import Customer from '../entity/customer';
import EventDispatcher from '../event/@shared/event-dispatcher';
import Address from '../entity/address';

export default class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) { }

  async createCustomer(name: string): Promise<void> {
    const customer = Customer.create(name);

    await this.customerRepository.create(customer);

    this.notifyAllCustomerEvents(customer);
  }

  async changeCustomerAddress(
    customerId: string,
    street: string,
    number: number,
    zip: string,
    city: string,
  ): Promise<void> {
    const customer = await this.customerRepository.find(customerId);
    const address = new Address(street, number, zip, city);
    customer.changeAddress(address);

    await this.customerRepository.update(customer);

    this.notifyAllCustomerEvents(customer);
  }

  private notifyAllCustomerEvents(customer: Customer) {
    customer.getDomainEvents().forEach((event) => {
      this.eventDispatcher.notify(event);
    });

    customer.clearDomainEvents();
  }
}
