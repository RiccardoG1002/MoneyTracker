// rrd imports
import { useLoaderData } from "react-router-dom";

// helper functions
import { createBudget, fetchData } from "../helpers";

// components
import Intro from "../components/Intro.jsx";
import AddBudgetForm from "../components/AddBudgetForm";

// libraries
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log("🚀 ~ file: Dashboard.jsx:24 ~ dashboardAction ~ _action:", _action);

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
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm></AddBudgetForm>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
