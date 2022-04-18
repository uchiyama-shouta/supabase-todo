import "tailwindcss/tailwind.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { supabase } from "lib/supabase";

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  switch (metric.name) {
    case "FCP":
      console.log(`FCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "LCP":
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "TTFB":
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`);
      break;
    case "Next.js-hydration":
      console.log(
        `Hydration: ${Math.round(metric.startTime * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`,
      );
      break;
    default:
      break;
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    const user = supabase.auth.user();
    if (user && pathname === "/") {
      push("/dashboard");
    } else if (!user && pathname !== "/") {
      await push("/");
    }
  };
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" && pathname === "/") {
      push("/dashboard");
    }
    if (event === "SIGNED_OUT") {
      push("/");
    }
  });
  useEffect(() => {
    validateSession();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
export default MyApp;
