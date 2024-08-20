import { randomUUID } from 'node:crypto';
import DomainEventSourced from '../event/@shared/domain-event-sourced';
import CustomerAddressChangedEvent from '../event/customer/customer-address-changed.event';
import CustomerCreatedEvent from '../event/customer/customer-created.event';
import Address from './address';

export default class Customer extends DomainEventSourced {
  private _id: string;

  private _name: string;

  private _address!: Address;

  private _active: boolean = false;

  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  static create(name: string) {
    const customer = new Customer(randomUUID(), name);

    customer.addDomainEvent(new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
    }));

    return customer;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  private validate() {
    if (!this._id) {
      throw new Error('Id is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  addAddress(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.addDomainEvent(new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: this._address.toJSON(),
    }));
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
