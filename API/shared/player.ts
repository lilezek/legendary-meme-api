import {AEntity} from "./entity";
import {ISerializable, SPlayer, SAction} from "./serial";
import {IAction, serialToAction} from "./action";
import {ShGame} from "./game";

export abstract class ShPlayer extends AEntity {
  // TODO: game is not any
  protected actions: IAction[] = [];
  protected foodLevel: number;

  get dead(): boolean {
    return this.foodLevel <= 0;
  }

  get food(): number {
    return this.foodLevel;
  }

  set food(o: number) {
    this.foodLevel = o;
  }

  constructor(game: ShGame) {
    super(game);
    this.position = { x: 0, y: 0 };
    this.foodLevel = 10;
  }

  serialize(): SPlayer {
    var r = {
      type: "Player",
      id: this.id,
      position: this.position,
      actions: this.actions.map((v) => v.serialize()),
      foodLevel: this.foodLevel
    }
    return r;
  }

  unserialize(o: SPlayer): boolean {
    if ((o.type !== "Player")
      || (typeof o.id !== "string")
      || (!o.position || typeof o.position.x !== "number")
      || (!o.position || typeof o.position.y !== "number")
      || (!o.actions)
      || (typeof o.foodLevel !== "number"))
      return false;
    this.actions = [];
    for (var i = 0; i < o.actions.length; i++) {
      var act = serialToAction(o.actions[i], this.game);
      if (act !== null)
        this.actions.push(act);
      else {
        this.actions = [];
        return false;
      }
    }
    this.id = o.id;
    this.position.x = o.position.x;
    this.position.y = o.position.y;
    this.foodLevel = o.foodLevel;
    return true;
  }
}
