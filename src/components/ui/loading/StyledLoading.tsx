/* https://codepen.io/touneko/pen/ygOgWj */

import React from 'react';

export default function StyledLoading() {
  return (
    <div className="flex-center fixed inset-0 z-50 bg-gradient-start">
      <div className="flex flex-col">
        <div className="loading-cat scale-50">
          <div className="cat-body"></div>
          <div className="cat-animation-mask"></div>
          <div className="cat-head">
            <div className="cat-face"></div>
            <div className="cat-ear"></div>
            <div className="cat-hand"></div>
            <div className="cat-eye"></div>
            <div className="cat-eye-light"></div>
            <div className="cat-mouth"></div>
            <div className="cat-beard left"></div>
            <div className="cat-beard right"></div>
          </div>
          <div className="cat-foot">
            <div className="cat-belly"></div>
            <div className="cat-leg"></div>
            <div className="cat-tail"></div>
          </div>
        </div>
        <p className="text-center text-xl font-semibold">
          <span className="tracking-widest">Ciallo</span>
          {'～(∠・ω< )⌒★'}
        </p>
      </div>
    </div>
  );
}
