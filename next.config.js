/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: false,

  //- 유저가 source로 가려하면 destination으로 보낸다!
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/new-sexy-blog/:path*',
        // destination: 'https://prettygood236.github.io',
        // 브라우저나 검색엔진이 이 정보를 기억하지 않도록 한다. (false)
        permanent: false,
      },
    ];
  },
  //- redirects와 마찬가지로 source로의 요청을 destination으로 응답하여 준다.
  //- 다만 redirects는 URL이 바뀌기 때문에 유저가 인식할 수 있지만 rewrites는 URL이 바뀌지 않는다.
  //* rewrites는 source로의 요청을 서버 뒤로 masking하여 가린다!. => API를 안보여줄 수 있다.
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        //. source에서 id이면 destination에서도 id이어야 한다.
        source: '/api/movies/:id',
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
