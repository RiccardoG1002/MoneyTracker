// rrd imports
import { useLoaderData } from "react-router-dom";

//  helper functions
import { fetchNonJsonData } from "../helpers"

// loader
export function dashboardLoader() {
    const userName = fetchNonJsonData("userName");
    return { userName }
    }

    const Dashboard = () => {
    const { userName } = useLoaderData()

    return (
            <div>
            <h1>{userName}</h1>
            Dashboard
            </div>
        )
}
export default Dashboard