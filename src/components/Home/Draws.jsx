import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Draws = () => {
  const [draw, setDraw] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sketch-s4dw.onrender.com/api/v1/draw');
        setDraw(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleView = () => {
    router.push(`/sketch/${draw._id}`);
  };
  return (
    <div className="grid grid-cols-3 gap-5 mb-10 mt-7 container mx-auto">
      {draw.map((item) => (
        <div className="card w-96 bg-base-100 shadow-xl" onClick={handleView}>
          <figure>
            <img
              src="https://beebom.com/wp-content/uploads/2018/11/15-Best-Drawing-Programs-for-PC-and-Mac.jpg?w=750&quality=75"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">Art</div>
            </h2>
            <p>click to view sketch</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">line</div>
              <div className="badge badge-outline">circle</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Draws;
