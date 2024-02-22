import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "~/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout}) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}
