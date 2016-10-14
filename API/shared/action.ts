import {AEntity} from "./entity";
import {ISerializable, SAction, SMoveAction} from "./serial";
import {ShGame} from "./game";

export function serialToAction(o: SAction, world: ShGame) : IAction|null {
  if (o.type == "MoveAction") {
    var a = new MoveAction(world);
    a.unserialize(<SMoveAction>o);
    return a;
  }
  return null;
}

export interface IAction extends ISerializable<SAction> {
  doer: AEntity;
}

export class MoveAction implements IAction {
  doer: AEntity;
  private world: ShGame;
  /**
    @brief Direction in radians from center of doer.
  */
  direction: number = 0;

  constructor(world: ShGame) {
    this.world = world;
  }

  setDoer(doer: AEntity) : void {
    this.doer = doer;
  }

  serialize(): SMoveAction {
    return {
      type: "MoveAction",
      doer: this.doer.getId(),
      direction: this.direction
    };
  }

  unserialize(o: SMoveAction): boolean {
    this.doer = this.world.getEntityById(o.doer);
    this.direction = o.direction
    if (!this.doer || !this.direction)
      return false;
    return true;
  }

  getType() : string {
    return "MoveAction";
  }
}
