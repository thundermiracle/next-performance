import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";

interface MyProps extends AppProps {
  host: string;
  data: any;
}

export default function MyApp({ Component, pageProps, host, data }: MyProps) {
  console.log({ host, data });

  return <Component {...pageProps} data={data} />;
}

// use getInitialProps to fetch data
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: any = await App.getInitialProps(appContext);
  const { req, res } = appContext.ctx;

  if (req && res) {
    const host = req.headers.host;
    const dataRes = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    return { pageProps: appProps.pageProps, host, data: await dataRes.json() };
  } else {
    const { host, data } = window.__NEXT_DATA__.props;

    return { pageProps: appProps.pageProps, host, data };
  }
};
