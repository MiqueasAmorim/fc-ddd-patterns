export default abstract class Event<T = Record<string, any>> {
  dateTimeOccurred: Date;

  eventData: T;

  constructor(eventData: T) {
    this.eventData = eventData;
    this.dateTimeOccurred = new Date();
  }
}
