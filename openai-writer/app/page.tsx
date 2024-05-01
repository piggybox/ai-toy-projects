import Header from "./component/header/header"
import Body from "./component/body/body"

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'OpenAI Writer',
}

export default function Home() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}
