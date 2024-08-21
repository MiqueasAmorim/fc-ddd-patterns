import Event from '../../../@shared/event/event';

type EventData = {
  id: string;
  name: string;
};

export default class CustomerCreatedEvent extends Event<EventData> { }
