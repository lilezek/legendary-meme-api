import {uuid} from "./uuid";
import {ISerializable, SEntity} from "./serial";
import {ShGame} from "./game";

export abstract class AEntity implements ISerializable<SEntity> {
  // TODO: Game is not any
  protected game: ShGame;
  protected id: string;
  protected _position: {x: number, y: number};
  protected visible: boolean;

  constructor(game: ShGame) {
    this.game = game;
    this.id = uuid();
    this._position = {x: 0, y: 0};
    this.visible = true;
  }

  getId(): string {
    return this.id;
  }

  get position() : {x:number, y:number} {
    return this._position;
  }

  set position(v: {x:number, y:number}) {
    this._position.x = v.x;
    this._position.y = v.y;
  }

  abstract tick();
  abstract serialize() : SEntity;
  abstract unserialize(o: SEntity) : boolean;
}
