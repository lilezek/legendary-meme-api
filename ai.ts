import {Game, Turn} from "./API/0/game";
import {Food} from "./API/0/food";
import {MoveAction} from "./API/shared/action";

// Human driven movement with mouse.

var g = Game.getSingleton();
g.onTurn.connect((t) => {
  var p = <Food>g.getEntities().filter((v) => {
    return v instanceof Food;
  })[0];
  if (!p) {
    t.end(true);
    return;
  }
  var myself = g.getMyself();
  // Trigonometry pls
  var diff = {
    y: (p.position.y-myself.position.y),
    x: (p.position.x-myself.position.x)
  }
  var angle = Math.atan2(diff.y, diff.x);
  if (!isNaN(angle)) {
    var ma = new MoveAction(g);
    ma.direction = angle;
    myself.doAction(ma);
  }
  t.end(true);
})
