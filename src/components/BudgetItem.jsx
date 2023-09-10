import React from "react";

// helper functions
import { calculateSpentAmount, formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget }) => {
  // destructuring --> non devo più usare budget.id per l'id ecc.
  const { id, name, amount, color } = budget;
  const spent = calculateSpentAmount(id);
  console.log(spent / amount);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
