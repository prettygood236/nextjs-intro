//- NextJS는 pages안에 있는 컴포넌트들을 index.js는 /(home)으로, 나머지는 파일이름으로 라우팅하여 랜더링한다.
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Seo from '../components/Seo';

//- ReactJS는 NextJS에게 server-side rendering된 results prop을 받아 이것으로 무엇이든 할 수 있다. => Hydration
export default function Home({ results }) {
  // const [movies, setMovies] = useState();
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (await fetch('/api/movies')).json();
  //     setMovies(results);(
  //   })();
  // }, []);
  const router = useRouter();
  const goDetail = (id, title) => {
    router.push(`/movies/${title}/${id}`);
    // router.push(
    //   { pathname: `/movies/${id}`, query: { id, title } },
    //   `/movies/${id}` //- 두번째 인자인 as는 URL을 마스킹한다.
    // );
  };

  return (
    <div className='container'>
      <Seo title={'Home'} />
      {/* 같은 a태그를 가졌지만 about만 적용이 된다. */}
      {/* about.js가 랜더되어 /about에 있는 것이기 때문이다. */}
      {/* <style jsx global>
        {`
          a {
            color: green;
          }
        `}
      </style> */}
      {/* {!movies && <h4>Loading...</h4>} */}
      {results?.map((movie) => (
        // <a>태그는 <div>태그가 아니라 텍스트를 감싸고 있어야 하므로 보통 이렇게 하지 않는다.
        // <Link href={`/movies/${movie.id}`} key={movie.id}>
        //    <a>
        <div
          className='movie'
          onClick={() => goDetail(movie.id, movie.original_title)}
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          {/*//? 왜 굳이 부모태그에서 라우팅해주는데 제목인 h4태그에도 Link가 필요한가 */}
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
            {/* <Link href={`/movies/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link> */}
            {/* <Link
              href={{
                pathname: `/movies/${movie.id}`,
                query: { title: movie.original_title },
              }}
              as={`/movies/${movie.id}`}
            >
              <a>{movie.original_title}</a>
            </Link> */}
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

/* Loading을 유저에게 보여주기 싫고 fetch등 data관련 작업을 모두 server에서 한 다음 
- API가 모두 완료되었을 때(데이터가 모두 들어왔을 때) 페이지를 랜더할 수도 있다. (API가 돌아오기 전까지 화면에 아무것도 안보인다.)
* getServerSideProps : (오직) server-side에서(만) 실행하여 _app의 pageProps로 넘겨준다! 
홈 페이지는 이제 완전한 server-side rendering page가 되었다.
*/
export async function getServerSideProps() {
  //-API key를 여기에 써준다면 절대로 client에게 보여지지 않을 것이다.
  const { results } = await (
    await fetch('http://localhost:3000/api/movies')
  ).json();
  return { props: { results } };
}

/*
! NextJS : Pre-rendering -> Hydration
* 서버에서 미리 컴포넌트들을 랜더링해서 html을 만들어 던져주고
- (=> 자바스크립트가 비활성이어도 적어도 흰 화면없이 정적인 html은 볼 수 있고,
-     따라서 SEO(검색 엔진 최적화)에도 유저에게도 좋다!)
* 클라이언트에서 자바스크립트, react로딩이 끝나면 일반적인 react 앱처럼 interactive한 동작((Re)Hydration,수분보충,react로 동적상태로 변화)이 가능해 진다! 

! Next.js has two forms of pre-rendering
The difference is in when it generates the HTML for a page.
* (Recommended) Static-site Generation(SSG) : getStaticProps (and getStaticPaths if necessary)
- The HTML is generated at build time and will be reused on each request.  
- It can be cached by a CDN.
* Server-side Rendering(SSR) : getServerSideProps
- The HTML is generated on each request.

! Incremental Static Regeneration (ISR)   
- Next.js allows you to create or update static pages after you’ve built your site. 
- ISR enables you to use static-generation on a per-page basis, without needing to rebuild the entire site.
- With ISR, You can retain the benefits of static while scaling to millions of pages.





*/
