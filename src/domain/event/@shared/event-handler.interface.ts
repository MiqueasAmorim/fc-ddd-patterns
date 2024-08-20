import Event from './event';

export default interface EventHandlerInterface<T extends Event = Event> {
  handle(event: T): void
}
