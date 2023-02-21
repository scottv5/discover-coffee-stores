import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>Scott Varieur &copy; 2023</p>
      </footer>
    </>
  );
}
