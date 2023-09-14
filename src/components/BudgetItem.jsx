import React from "react";

// helper functions
import { calculateSpentAmount, formatCurrency, formatPercentage } from "../helpers";

// react-router-dom
import { Form, Link } from "react-router-dom";

// libraries
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

const BudgetItem = ({ budget, showDelete = false }) => {
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
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm("Are you sure to permanently delete this budget?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20}></TrashIcon>
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View details</span>
            <BanknotesIcon width={20}></BanknotesIcon>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
