import {AEntity} from "./entity";
import {ISerializable, SFood} from "./serial";
import {ShPlayer} from "./player";

export abstract class ShFood extends AEntity {

  serialize(): SFood {
    return {
      type: "Food",
      position: this.position,
      id: this.id
    };
  }

  unserialize(o: SFood): boolean {
    if ((o.type !== "Food")
      || (!o.position)
      || (typeof o.position.x !== "number")
      || (typeof o.position.y !== "number")
      || (typeof o.id !== "string"))
      return false;
    this.id = o.id;
    this.position.x = o.position.x;
    this.position.y = o.position.y;
    return true;
  }
}
