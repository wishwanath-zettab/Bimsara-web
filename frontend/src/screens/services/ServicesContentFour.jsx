import React from "react";
import ClientCard from "../../components/clientCard/ClientCard";
import "./ServicesStyles.scss";

const ServicesContentFour = () => {
  const data = [
    {
      name: "Dudley Leelananda",
      rev: "“He is a trusted advisor, an excellent negotiator and a person with excellent communication skills.”",
      link: "https://www.youtube.com/watch?v=47Kw96zbUkA",
      des: "Group Financial Consultant at Hijazi & Ghosheh Group",
      des2: "Former Credit Risk Consultant at HSBC - Jordan",
    },
    {
      name: "Ushan & Piumie Liyanage",
      rev: "“He never influenced or pressurized us. Information was given, but it’s our own decision.”",
      link: "https://www.youtube.com/watch?v=HoC-XXBEDvU",
      des: "Ushan Liyanage - General Manager HR & Admin at Lankem Ceylon PLC",
      des2: "Sri Lanka",
    },
    {
      name: "Atheek Marikar & Crystal",
      rev: "“He seems to understand what you want very fast. He takes a good brief from the client.”",
      link: "https://www.youtube.com/watch?v=xmjcmufaR6M",
      des: "Atheek Marikar - Managing Director/CEO at PepperCube Consultants, Sri Lanka",
      des2: "Crystal Nathan - Strategic Curator at PepperCube Consultants, Sri Lanka",
    },
    {
      name: "Damian Fernando",
      rev: "“At any stage of the sale process, he never pushed me.”",
      link: "https://www.youtube.com/watch?v=5VG5JPTOJ0U&t",
      des: "Chief Operating Officer at NKAR Travels & Tours (Pvt) Ltd",
      des2: "Senior Lecturer/Course Director at NSBM",
    },
  ];

  return (
    <div className="ServicesContentFiveMain" id="home-video">
      <div className="ServicesContentFive">
        <div className="grid-container">
          {data.map((item) => (
            <ClientCard
              key={item.name}
              name={item.name}
              rev={item.rev}
              link={item.link}
              des={item.des}
              des2={item.des2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ServicesContentFour;
