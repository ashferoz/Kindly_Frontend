import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import UserContext from "./contexts/user";
import ProtectedRoutes from "./utils/ProtectedRoutes";
const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ accessToken, setAccessToken }}>
          <div className="font-fraunces">
            <Navbar />
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path="/" element={<Navigate replace to="/main" />} />
                <Route path="/main" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signin" element={<SignIn />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/inbox"  />
              </Route>
              </Routes>
            </Suspense>
          </div>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
