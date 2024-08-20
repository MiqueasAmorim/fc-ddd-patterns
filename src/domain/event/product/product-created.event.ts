import Event from '../@shared/event';

export default class ProductCreatedEvent implements Event {
  dateTimeOccurred: Date;

  eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData;
    this.dateTimeOccurred = new Date();
  }
}
