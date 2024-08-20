import EventHandlerInterface from './event-handler.interface';
import Event from './event';

export default interface EventDispatcherInterface {
  notify(event: Event): void
  register(eventName: string, eventHandler: EventHandlerInterface): void
  unregister(eventName: string, eventHandler: EventHandlerInterface): void
  unregisterAll(): void
}
