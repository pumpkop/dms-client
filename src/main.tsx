import React from "react";
import ReactDOM from "react-dom";
// import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const rootNode = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>,
  rootNode,
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <ReactQueryDevtools initialIsOpen={true} />
//     </QueryClientProvider>
//   </React.StrictMode>,
// );
