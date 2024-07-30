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
import RequestForm from "./pages/RequestForm";
import ConnectionsBeneficiary from "./pages/ConnectionsBeneficiary";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userUUID, setUserUUID] = useState("");
  const [role, setRole] = useState("");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{
            accessToken,
            setAccessToken,
            setUserUUID,
            userUUID,
            role,
            setRole,
          }}
        >
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
                  <Route path="/inbox" element={<ConnectionsBeneficiary />}/>
                  <Route path="/requestFrom" element={<RequestForm />} />
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
