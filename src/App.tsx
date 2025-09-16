import React, { Suspense } from 'react';
import { Route, Routes, Navigate, Outlet, BrowserRouter } from 'react-router-dom';

import { Footer, Header, Nav, BackToTop } from './components';
import { useGlobal } from './context/GlobalContext';

const Home = React.lazy(() => import('./view/filter/General'));
const Business = React.lazy(() => import('./view/filter/Business'));
const Entertainment = React.lazy(() => import('./view/filter/Entertainment'));
const Health = React.lazy(() => import('./view/filter/Health'));
const Science = React.lazy(() => import('./view/filter/Science'));
const Sports = React.lazy(() => import('./view/filter/Sports'));
const Technology = React.lazy(() => import('./view/filter/Technology'));
const Page404 = React.lazy(() => import('./view/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./view/pages/page500/Page500'));

const ProtectedRoute: React.FC = () => {
  const { isMobile } = useGlobal();
  return (
    <div className="flex flex-col w-full  bg-gray-100 " >
      {/* <!-- Header --> */}
      <BackToTop />
      <Header />
      {isMobile === false ?
        <nav className='bg-red-800 top-0 sticky z-100'>
          <Nav
            classNameUl='flex list-none mx-auto max-w-[1350px] items-center '
            classNameLi='px-[20px] py-[10px] hover:bg-red-700 transiton-all duration-300'
            classNameA='text-xl cursor-pointer'
            classNamelIActive='text-white bg-red-700'
          />
        </nav>
        : <></>}
      <Outlet />
      <Footer />
    </div>

  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/business" element={<Business />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/health" element={<Health />} />
            <Route path="/science" element={<Science />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/technology" element={<Technology />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
};

export default App
