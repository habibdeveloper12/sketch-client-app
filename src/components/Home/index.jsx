import React from 'react';

import Draws from './Draws';

import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  return (
    <div className=" bg-white min-h-screen mt-16">
      {' '}
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Draw Your Sketch!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque
              aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary" onClick={() => router.push('/sketch')}>
              Sketch Now
            </button>
          </div>
        </div>
      </div>
      <Draws />
    </div>
  );
};

export default Home;
