import { randomUUID } from 'node:crypto';
import Customer from '../entity/customer';
import Address from '../value-object/address';

export default class CustomerFactory {
  static create(name: string) {
    return new Customer(randomUUID(), name);
  }

  static createWithAddress(name: string, address: Address) {
    const customer = CustomerFactory.create(name);
    customer.addAddress(address);
    return customer;
  }
}
