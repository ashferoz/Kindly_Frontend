import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Login from "./components/Login";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="font-fraunces">
          {/* <Main /> */}
          {/* <SignIn /> */}
          {/* <Register /> */}
          <Login />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
