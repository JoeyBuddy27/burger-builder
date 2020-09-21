import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Ketchup", type: "ketchup" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <h1 className={classes[props.infoStyle]}>{props.info}</h1>
    <h3 className={classes.Price}>£ {props.price.toFixed(2)}</h3>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        total={props.summed(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        disabledMore={props.disabledMore[ctrl.type]}
        btnType={props.totalType(ctrl.type)}
        infoUpdate={props.infoUpdate}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>

    <button className={classes.ClearButton} onClick={props.clear}>
      {" "}
      START OVER{" "}
    </button>
  </div>
);

export default buildControls;
