// simulate synchronous calls
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 2000));

// generate random color
const generateRandomColor = () => {
    const exisitingBudgetLength = fetchData('budgets')?.length ?? 1;
    return `${exisitingBudgetLength * 34} 65% 50%`;
} 

// fetch item
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key)
}

// create budget
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudget = fetchData('budgets') ?? [];
    return localStorage.setItem('budgets', JSON.stringify([...existingBudget, newItem]));
}

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData('expenses') ?? [];
    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
}

// total spent by budget
export const calculateSpentAmount = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((accumulator, expense) => {
        // check if expnese.id === budgetId
        if(expense.budgetId !== budgetId) return accumulator;
        // add current amount to total
        return accumulator += expense.amount; 
    }, 0); 
    return budgetSpent
}

// format currency
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    });
}

// format percentages 
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}