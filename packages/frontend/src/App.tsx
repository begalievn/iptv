import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Routes from "./routes.tsx";
import Navbar from "./components/containers/navbar";
import AuthProvider from "./infrastructure/contexts/auth-context";
import { useTheme } from "./infrastructure/contexts/theme-context.tsx";
import InnerContainer from "./components/containers/inner-container/index.tsx";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const { darkTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <InnerContainer>
            <Routes />
          </InnerContainer>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
