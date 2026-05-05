import React, { useEffect, useState } from "react";
import axios from "axios";
import Members from "../../components/members/members";
import RateCard from "../../components/rateCard/RateCard";
import MemberCard from "../../components/memberCard/memberCard";

import "./AboutStyles.scss";
import MobileMemberCard from "../../components/memberCard/mobileMemberCard/mobileMemberCard";

const AboutContentSix = () => {
  const [positionsCount, setPositionsCount] = useState(12);
  const [providersCount, setProvidersCount] = useState(7);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch team members count
        const teamResponse = await axios.get('http://localhost:5000/api/team-members');
        if (teamResponse.data && Array.isArray(teamResponse.data)) {
          setPositionsCount(teamResponse.data.length);
        }

        // Fetch service providers count
        const providersResponse = await axios.get('http://localhost:5000/api/service-providers');
        if (providersResponse.data && Array.isArray(providersResponse.data)) {
          setProvidersCount(providersResponse.data.length);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);
  return (
    <div className="AboutContentSix" id="about-team">
      <div className="top-container">
        <div className="top-content">OUR TEAM</div>
      </div>
      <div className="bottom-container">
        <div className="bottom-left-container">
          <div className="heder-content">
            We are an ever growing group of individuals in terms of number,
            proficiency and experiences.
          </div>
          <div className="sub-content">
            Through our collective efforts including sharing knowledge about
            diverse projects, we have made our journey far more than a success
            story.
          </div>
        </div>
        <div className="bottom-right-container">
          <RateCard des="Positions" des2=" and growing" rate={positionsCount.toString()} />
          <div className="margin-top">
            <RateCard des="Service" des2=" Providers" rate={providersCount.toString()} />
          </div>
        </div>
      </div>
      <div className="member-view">
        <Members />
      </div>
      <div className="member-tab-view">
        <MemberCard />
      </div>
      <div className="member-mobile-view">
        <MobileMemberCard />
      </div>
    </div>
  );
};
export default AboutContentSix;
