//- Dynamic URL : 파일명에 대괄호 사용
//- Catch All URL : Spread Operator(...) 사용

import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

export default function Detail({ params }) {
  const router = useRouter();
  console.log(router);
  console.log(router.query);
  //. 이 페이지는 server-side에서 pre-render되기 때문에 incognito모드에서 접속한다면 에러가 난다.
  //. 서버에는 router.query.params가 아직 존재하지 않기 때문이다.
  // const [title, id] = router.query.params;
  //. 따라서 다음과 같이 작성하여 client-side rendering만 되도록 해준다.
  // const [title, id] = router.query.params || [];
  //. 혹은 getServerSideProps을 사용하여 오직 server-side rendering만 되도록 한다. (소스코드에 title이 보인다.)
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      {/*//?  router.query.title은 유저가 홈페이지에서 상세페이지로 넘어올때에만 존재한다. */}
      {/* <h4>{router.query.title || 'Loading...'}</h4> */}
    </div>
  );
}

//. pre-render하여 SEO에 아주아주 최적화되게 만들고 절대 유저에게 loading화면을 보여주지않으려면 getServerSideProps을 사용하면 된다.
//? (어떻게 얻어지는가?) 이 경우에는 단순히 title과 id를 얻기위해 사용하였다.
export function getServerSideProps({ params: { params } }) {
  //?
  return { props: { params } };
}
