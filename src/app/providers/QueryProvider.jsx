import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
export default function QueryProvider({children}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}