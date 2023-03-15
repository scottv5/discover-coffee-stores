import "@/styles/globals.css";
import StoreProvider from "@/context/store-contex";

export default function App({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      <footer>
        <p>Scott Varieur &copy; 2023</p>
      </footer>
    </>
  );
}
