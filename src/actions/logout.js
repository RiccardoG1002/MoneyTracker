// rrd imports
import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "../helpers";

// libraries
import { toast } from "react-toastify";

export async function logoutAction() {
    // delete the user
    deleteItem({
        key: "userName"
    });
    deleteItem({
        key: "budgets"
    });
    deleteItem({
        key: "expenses"
    });
    console.log('Now should appear the toast');
    toast.success("You are now logged out!");
    // return redirect
    return redirect("/")
}