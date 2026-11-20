import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import router from "./router";

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
