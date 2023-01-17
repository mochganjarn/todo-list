import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";
import Head from "next/head";
import { logo } from "@/assets/img";
export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <title>Todo List</title>
        <link rel="icon" href={logo}></link>
      </Head>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </>
  );
}
