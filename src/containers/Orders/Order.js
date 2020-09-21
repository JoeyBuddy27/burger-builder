import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span className={classes.span} key={ig.name} amount={ig.amount}>
        {ig.name}: {ig.amount}{" "}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <h2>
        ORDER NO. <strong> 0{props.orderNum} </strong>{" "}
      </h2>
      <p>
        BURGER WITH: <strong> {ingredientOutput} </strong>{" "}
      </p>
      <p>
        PRICE: <strong> {props.price} </strong>
      </p>
    </div>
  );
};

export default order;
