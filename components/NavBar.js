import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';

export default function NavBar() {
  const router = useRouter();
  // console.log(router);

  return (
    <nav>
      {/* public 디렉토리에 있는 것들을 그냥 이렇게 불러올 수 있다. */}
      <img src='/vercel.svg' />
      <Link href='/'>
        {/* CSS - 1. module.css */}
        <a
          className={`${styles.link} ${
            router.pathname === '/' ? styles.active : ''
          }`}
        >
          {/* string 형태이면 되므로 배열 + join(' ')도 가능하다. */}
          Home
        </a>
      </Link>
      <Link href='/about'>
        {/* CSS - 2. styled JSX : 부모 컴포넌트가 같은 클래스네임을 쓰고 있어도 독립적으로 작동한다. */}
        <a className={router.pathname === '/about' ? 'active' : ''}> About</a>
      </Link>
      {/* 백틱 `을 쓰는 js string 형태이다 */}
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
