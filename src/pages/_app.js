import "@/styles/globals.css";
import "normalize.css/normalize.css";
import { Lato } from "@next/font/google";

const lato = Lato({
  weight: ["400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={lato.className}>
      <Component {...pageProps} />
    </main>
  );
}
