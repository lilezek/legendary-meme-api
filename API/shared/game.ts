import {AEntity} from "./entity";

export abstract class ShGame {
  protected entities: {[key: string] : AEntity} = {};

  addEntity(ent : AEntity) : void {
    this.entities[ent.getId()] = ent;
  }

  removeEntity(p : AEntity) : void {
    delete this.entities[p.getId()];
  }

  getEntities() : AEntity[] {
    return Object.keys(this.entities).map(k => this.entities[k]);
  }

  getEntityById(id: string) : AEntity {
    return this.entities[id];
  }
}
