import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Canvas from '~/components/Canvas';

import CanvasEventListeners from '~/components/CanvasEventListeners';
import Overlay from '~/components/Overlay';

export default function AppLayout() {
  const [object, setObject] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.style.overflow = 'hidden';
    }
    fetchData();
    return () => {
      if (html) {
        html.style.overflow = 'auto';
      }
    };
  }, [router.query.id]);
  async function fetchData() {
    if (router.query.id) {
      try {
        const response = await axios.get(`https://sketch-s4dw.onrender.com/api/v1/draw/${router.query.id}`);
        const drawData = response.data;
        console.log('Draw data:', drawData);
        await setObject(drawData.data.object);
      } catch (error) {
        console.error('Error fetching draw data:', error);
        // Handle the error as needed
      }
    }
  }

  // Call the function

  console.log('dfd', object);

  return (
    <>
      <Overlay {...{ object }} />
      <Canvas {...{ setObject, object }} />

      <CanvasEventListeners />
    </>
  );
}
