import React from "react";
import Members from "../../components/members/members";
import RateCard from "../../components/rateCard/RateCard";
import MemberCard from "../../components/memberCard/memberCard";

import "./AboutStyles.scss";
import MobileMemberCard from "../../components/memberCard/mobileMemberCard/mobileMemberCard";

const AboutContentSix = () => {
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
          <RateCard des="Positions" des2=" and growing" rate="12" />
          <div className="margin-top">
            <RateCard des="Service" des2=" Providers" rate="7" />
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
