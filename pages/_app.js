//* NextJS는 pages에 있는 컴포넌트들을 Component prop으로서 _app.js 내에 함수에 전달하여 랜더링한다!.
//. 예를 들어, 우리가 홈페이지로 갈 땐 NextJs는 Home컴포넌트를 받아 render하기 위해
//. Component 자리에 넣고, async getServerSideProps함수를 호출하고 리턴으로 props를 받아 pageProps 자리에 넣는다.
import Layout from '../components/Layout';
// _app.js에서만 globals.css import가 가능하다.
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <NavBar /> */}
      <Layout>
        {/* pages의 컴포넌트들이 Layout의 자식으로 랜더링된다. */}
        <Component {...pageProps} />
        <style jsx global>
          {``}
        </style>
      </Layout>
    </>
  );
}
