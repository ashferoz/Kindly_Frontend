import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./components/Main";
import SignIn from "./components/SignIn";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="font-fraunces">
          {/* <Main /> */}
          <SignIn />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
