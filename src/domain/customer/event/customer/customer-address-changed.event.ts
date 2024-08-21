import Event from '../../../@shared/event/event';

type EventData = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
};

export default class CustomerAddressChangedEvent extends Event<EventData> { }
