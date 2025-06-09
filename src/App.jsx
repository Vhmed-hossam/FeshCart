import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./Contexts/Authcontext.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./Routing/Feashcart_routes.jsx";

const queryclient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryclient}>
      <AuthContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
