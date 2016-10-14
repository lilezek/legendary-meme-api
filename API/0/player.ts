import {IAction, serialToAction} from "../shared/action";
import {ShPlayer} from "../shared/player";
import {SPlayer} from "../shared/serial";
import {Game} from "./game";

/**
  This class represents the entity player, basic unit of the game.
*/
export class Player extends ShPlayer {
  /**
    These actions will be sent to server after ending the actual turn.
  */
  protected toDoActions: {[key: string] : IAction} = {};

  /**
    Adds an action to do after the end of this turn.
    @param a The action to do.
  */
  doAction(a: IAction): void {
    a.doer = this;
    this.toDoActions[a.constructor["name"]] = a;
  }

  /**
    Clears all actions prepared for this turn.
  */
  clearActions(): void {
    this.toDoActions = {};
  }

  /**
    Returns the actions prepared for this turn.
    @return An array of actions.
  */
  getActualActions(): IAction[] {
    return Object.keys(this.toDoActions).map(v => this.toDoActions[v]);
  }

  tick() {

  }
}
