/// <reference path="../../typings/index.d.ts" />

import {Signal} from "./event";
import {Player} from "./player";
import {Food} from "./food";
import {SPlayer, SEntity, SPerspective, ISerializable} from "../shared/serial";
import {ShGame} from "../shared/game";
import {AEntity} from "../shared/entity";

/**
  @brief Singleton based class. This is the main point of simulation.
  Contains every event any AI should process.
*/
export class Game extends ShGame {
  /**
    Singleton element.
  */
  private static singleton: Game | null;


  /**
    Access to singleton.
    @return The singleton of Game class.
  */
  static getSingleton(): Game {
    return Game.singleton = (Game.singleton || new Game());
  }

  /**
    onTurn is triggered every turn. It passes a Turn instance.
    @event
  */
  public onTurn: Signal<(turn: Turn) => void> = new Signal<any>();

  private lastTurn: Turn | null;
  private socket: SocketIOClient.Socket;

  /**
    **Do not use.**
    @note Use Game#getSingleton() instead.
  */
  constructor() {
    super();
    this.socket = <SocketIOClient.Socket>window["serverSocket"];
    if (!this.socket)
      throw "Error chungo en la inicialización de la api";
    this.lastTurn = null;
    if (Game.singleton) {
      // TODO: SingletonException
      throw "mal"
    }

    this.socket.on("newTurn", (data : SPerspective) => {
      var p: SEntity[] = data.entities;
      for (var i = 0; i < p.length; i++) {
        if (p[i].id in this.entities) {
          this.entities[p[i].id].unserialize(p[i]);
        } else {
          if (p[i].type === "Player")
            this.entities[p[i].id] = new Player(this);
          else if (p[i].type === "Food")
            this.entities[p[i].id] = new Food(this);
          else
            console.error("Unkown entity type");
          this.entities[p[i].id].unserialize(p[i]);
        }
      }
      this.myself = <Player>this.entities[data.myself];
      if (!this.myself) {
        console.error("Pienso pero no existo");
        return;
      }
      this.myself.clearActions();
      this.onTurn.trigger(new Turn());
    });

    console.log("Beginning IA");
    // TODO: send useful data
    this.socket.emit("begin", {});
  }

  /**
    @brief Sends a message to server.
    @param messageType Type of the message to send.
    @param serializedData Data that can be serialized by the use of JSON.stringify.
  */
  sendToServer(messageType: string, serializedData: Object|string) {
    this.socket.emit(messageType, serializedData);
  }

  private myself: Player;

  /**
    Returns the player which represents the AI's player.
    @return This player.
  */
  getMyself(): Player {
    return this.myself;
  }
}

/**
  Represents every the status of the world in a turn.
  @TODO This class should be a serializable class.
*/
export class Turn {
  private index: number;
  private _ended: boolean;
  // TODO: Use server-side time lapsus
  private _begins: number;
  private _game = Game.getSingleton();

  /**
    Constructs a new turn.
  */
  constructor() {
    this._begins = new Date().getTime();
    this.index = 0;
    this._ended = false;
  }

  /**
    Marks this turn as ended, and then sends a message to server with every action
    the AI is going to do.
    @param force (*false* by default). If false, this turn will be ignored if
    the message gets too late to the server. If true, this turn will be processed
    even if this turn has already passed, and actions will be processed in
    the last turn.
  */
  end(force?: boolean): void {
    if (!this._ended) {
      var myself = this._game.getMyself();
      var actions = myself.getActualActions();
      actions = Object.keys(actions).map(key => actions[key].serialize());

      var t = new Date().getTime();
      this._game.sendToServer("endTurn", { actions: actions, force: force || false });
      this._ended = true;
    }
  }
}
