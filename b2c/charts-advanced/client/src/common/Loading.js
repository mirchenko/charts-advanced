import React from 'react';

export const Loading = () => <div className="container">
  <div className="loading-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
         className="lds-eclipse">
      <path stroke="none"
            d="M10 50A40 40 0 0 0 90 50A40 44 0 0 1 10 50" fill="#fee38d" transform="rotate(301.923 50 52)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 52;360 50 52"
                          keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
      </path>
    </svg>
  </div>
</div>;