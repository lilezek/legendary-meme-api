import {Game, Turn} from "./API/0/game";
import {Food} from "./API/0/food";
import {MoveAction} from "./API/shared/action";

// This AI looks for food.

var g = Game.getSingleton();

// Listen to new turn.
g.onTurn.connect((t) => {
  // Filter out Food element.
  var p = <Food>g.getEntities().filter((v) => {
    return v instanceof Food;
  })[0];

  // If not food found, end this turn.
  if (!p) {
    t.end(true);
    return;
  }

  // Determine the angle between myself and food.
  var myself = g.getMyself();
  var diff = {
    y: (p.position.y-myself.position.y),
    x: (p.position.x-myself.position.x)
  }
  var angle = Math.atan2(diff.y, diff.x);

  // If the angle is correct, move towards it.
  if (!isNaN(angle)) {
    var ma = new MoveAction(g);
    ma.direction = angle;
    myself.doAction(ma);
  }
  t.end(true);
})
