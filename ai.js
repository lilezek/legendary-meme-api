define(["require", "exports", "./API/0/game", "./API/0/food", "./API/shared/action"], function (require, exports, game_1, food_1, action_1) {
    "use strict";
    var g = game_1.Game.getSingleton();
    g.onTurn.connect(function (t) {
        var p = g.getEntities().filter(function (v) {
            return v instanceof food_1.Food;
        })[0];
        if (!p) {
            t.end(true);
            return;
        }
        var myself = g.getMyself();
        var diff = {
            y: (p.position.y - myself.position.y),
            x: (p.position.x - myself.position.x)
        };
        var angle = Math.atan2(diff.y, diff.x);
        if (!isNaN(angle)) {
            var ma = new action_1.MoveAction(g);
            ma.direction = angle;
            myself.doAction(ma);
        }
        t.end(true);
    });
});
