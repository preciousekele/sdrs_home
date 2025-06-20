

import React, { useEffect, useState } from "react";
import "./Preloader.css"; 

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); 

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
      <div className="preloader">
        <div
          className="status-mes"
          style={{
            backgroundImage:
              "url(https://mcu.edu.ng/wp-content/uploads/2023/12/270-e1704153183142.png)"
          }}
        ></div>
      </div>
  );
};

export default Preloader;
