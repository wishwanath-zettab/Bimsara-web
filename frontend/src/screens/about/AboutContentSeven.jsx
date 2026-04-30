import React, { useEffect, useState } from "react";
import axios from "axios";
import wijeya from "../../assets/images/Bimsara Real Estate - Wijeya Newspapers Logo.webp";
import ikman from "../../assets/images/Bimsara Real Estate - Ikman Logo.webp";
import lpw from "../../assets/images/Bimsara Real Estate - Lanka Property Web Logo.webp";
import hit from "../../assets/images/Bimsara Real Estate - Hitmedia Logo.webp";

import "./AboutStyles.scss";
const AboutContentSeven = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service-providers');
        setProviders(response.data || []);
      } catch (error) {
        setProviders([
          { id: 1, company_name: 'Wijeya Newspapers', logo_path: wijeya },
          { id: 2, company_name: 'Ikman', logo_path: ikman },
          { id: 3, company_name: 'Lanka Property Web', logo_path: lpw },
          { id: 4, company_name: 'Hitmedia', logo_path: hit }
        ]);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="AboutContentSeven">
      <div className="header">Our Service Providers</div>
      <div className="image-container">
        {providers.map((provider) => (
          provider.logo_path ? (
            <img
              key={provider.id}
              alt={provider.company_name}
              src={provider.logo_path.startsWith('http') ? provider.logo_path : `http://localhost:5000${provider.logo_path}`}
              className="image-item"
            />
          ) : null
        ))}
      </div>
    </div>
  );
};
export default AboutContentSeven;
