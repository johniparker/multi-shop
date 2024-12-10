import { BrowserRouter as Router } from "react-router-dom";
import RouterProvider from "./components/layout/Router";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <RouterProvider />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
