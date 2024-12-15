import "./App.css";
import Navbar from "./components/containers/navbar";
import Routes from "./routes.tsx";
import AuthProvider from "./infrastructure/contexts/auth-context";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
