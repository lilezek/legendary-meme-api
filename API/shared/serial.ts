import {IAction} from "./action";

export interface ISerializable<T> {
  serialize(): T;
  unserialize(obj: T): boolean;
}

export interface SEntity {
  type: string;
  id: string;
  position: { x: number, y: number };
}

export interface SPlayer extends SEntity {
  actions: SAction[];
  foodLevel: number;
}

export interface SFood extends SEntity {

}

export interface SAction {
  type: string;
  doer: string;
}

export interface SMoveAction extends SAction {
  direction: number;
}

export interface SPerspective {
  entities: SEntity[];
  myself: string;
  myScore: number;
}
