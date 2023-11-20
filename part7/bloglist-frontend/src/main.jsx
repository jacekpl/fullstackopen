import ReactDOM from "react-dom/client"
import App from "./App"
import {NotificationContextProvider} from "./NotificationContext.jsx"
import {QueryClient, QueryClientProvider} from "react-query"
import {UserContextProvider} from "./UserContext.jsx"
import {BrowserRouter as Router} from 'react-router-dom'
import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <NotificationContextProvider>
                <Router>
                    <App/>
                </Router>
            </NotificationContextProvider>
        </UserContextProvider>
    </QueryClientProvider>
);
