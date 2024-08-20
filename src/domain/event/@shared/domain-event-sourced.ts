import Event from './event';

export default abstract class DomainEventSourced {
  private domainEvents: Event[] = [];

  protected addDomainEvent(event: Event): void {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): Event[] {
    return this.domainEvents;
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }
}
