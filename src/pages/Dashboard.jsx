// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// helper functions
import { createBudget, createExpense, deleteObject, fetchData, wait } from "../helpers";

// components
import Intro from "../components/Intro.jsx";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// libraries
import { toast } from "react-toastify";
import { StrictMode } from "react";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}!`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  // budget added
  if (_action === "createBudget") {
    try {
      // create budget
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success(`Budget created!`);
    } catch (e) {
      throw new Error("There was a problem creating your budget!");
    }
  }

  // expense added
  if (_action === "createExpense") {
    try {
      // create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense!");
    }
  }

  // expense deleted
  if (_action === "deleteExpense") {
    try {
      // delete expense
      deleteObject({
        key: "expenses",
        id: values.expenseId,
      });
      // display toast
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense!");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {/* budgets ? () : () */}
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm></AddBudgetForm>
                  <AddExpenseForm budgets={budgets}></AddExpenseForm>
                </div>
                <h2>Exisitng Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget}></BudgetItem>
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}></Table>
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View All Expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Presonal budgeting is the secret to financial freedom</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm></AddBudgetForm>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
