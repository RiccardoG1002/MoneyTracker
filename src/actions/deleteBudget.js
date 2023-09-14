import { toast } from "react-toastify";
import { deleteObject, getAllMatchingItems } from "../helpers"
import { redirect } from "react-router";

export const deleteBudget = ({ params }) => {
    try {deleteObject({
            key: "budgets",
            id: params.id,
        });
        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })
        associatedExpenses.forEach((expense) => {
            deleteObject({
                key: "expenses",
                id: expense.id,
            });
        })
        toast.success("Budget deleted successfully!");
    } catch (e) {
        throw new Error('There was a problem deleting your budget');
    }
    return redirect("/");
}