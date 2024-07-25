import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="font-fraunces">
          <Navbar />
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Navigate replace to="/main" />} />
              <Route path="/main" element={<Main />} />
              <Route path="/profile" />
              <Route path="/inbox" />
            </Routes>
          </Suspense>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
