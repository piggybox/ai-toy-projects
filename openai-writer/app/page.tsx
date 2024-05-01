import Header from "./component/header/header"
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
