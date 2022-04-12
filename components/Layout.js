import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {/* pages의 컴포넌트들이 Layout의 자식이기 때문에 아래를 지우면 _app에 있더라도 랜더되지 않는다. */}
      <div>{children}</div>
    </>
  );
}
