// generate random color
const generateRandomColor = () => {
    const exisitingBudgetLength = fetchData('budgets')?.length ?? 0;
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