// rrd imports
import { useLoaderData } from "react-router-dom";

// helper functions
import { createBudget, createExpense, fetchData, wait } from "../helpers";

// components
import Intro from "../components/Intro.jsx";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

// libraries
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
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
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

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
