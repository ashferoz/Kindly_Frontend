import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./components/Main";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="font-fraunces">
          <Main />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
