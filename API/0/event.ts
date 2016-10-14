/**
  @brief Signal class. Useful for event driven connections.
  When event is finished, **trigger** must be called.
  Listeners must use **connect** method.
  @note Listeners must be connected before any trigger occurs. Otherwise,
  the events before connecting will be lost.
  @param cb A function representing the signature of connections.
*/
export class Signal<cb extends Function> {
  private slots: cb[] = [];

  /**
    Removes all connections.
  */
  disconnectAll(): void {
    this.slots = [];
  }

  /**
    Removes a single connection.
    @param slot Connection to remove.
  */
  disconnect(slot: cb): void {
    var erase = -1;
    this.slots = this.slots.filter((value) => {
      return (value !== slot);
    });
  }

  /**
    Connects a new function to receive events.
    @param slot Connection to stablish.
  */
  connect(slot: cb): void {
    this.slots.push(slot);
  }

  /**
    Triggers out a new event. Variadic arguments for this function must
    be the same as cb signature. 
    @param args Anything.
  */
  trigger(...args: any[]): void {
    this.slots.forEach((cb) => {
      cb.apply(null, args);
    });
  }
}
