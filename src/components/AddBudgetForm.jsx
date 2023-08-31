import React from "react";

// react-router-dom
import { Form } from "react-router-dom";

// libraries
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  return (
    <div className="form-wrapper">
      <h2>Create budget</h2>
      <Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget name</label>
          <input type="text" name="newBudget" id="newBudget" placeholder="e.g. Groceries" required />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input type="number" name="newBudgetAmount" step={0.01} id="newBudgetAmount" placeholder="e.g. $350" required inputMode="decimals" />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark">
          <span>Create budget</span>
          <CurrencyDollarIcon width={20}></CurrencyDollarIcon>
        </button>
      </Form>
    </div>
  );
};

export default AddBudgetForm;
