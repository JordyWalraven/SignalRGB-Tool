/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import HomePageBtn from 'renderer/components/HomePageBtn';

import '../css/basicStyle.css';

const Homepage = () => {
  useEffect(() => {
    sessionStorage.setItem('shouldGetMouse', 'false');
  }, []);

  return (
    <div
      style={{
        width: '99vw',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2%'
      }}
    >
      <div
        style={{
          width: '80%',
          height: '80%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row d-flex justify-content-center">
            <div className="col d-flex justify-content-center">
              <HomePageBtn
                to="normalized"
                title="Meter creator"
                imgUrl="https://media.istockphoto.com/id/1187951204/nl/foto/camera-lens-met-rode-en-blauwe-achtergrondverlichting-lenzen-voor-macro-fotografie-horizontale.jpg?s=170667a&w=0&k=20&c=js1hfSaSB18YPPerK0aB8H8n6iRh7T6zChgYQLGwgtY="
              />
            </div>
            <div className="col d-flex justify-content-center">
              <HomePageBtn
                to="svgapp"
                title="Svg app"
                imgUrl="https://i.pinimg.com/originals/b6/da/69/b6da691078f2c9cb70af1acec07c964b.gif"
              />
            </div>
            <div className="col d-flex justify-content-center">
              <HomePageBtn to="/" title="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
