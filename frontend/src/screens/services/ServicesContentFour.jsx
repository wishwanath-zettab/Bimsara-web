// eslint-disable-line no-use-before-define
import React, { useEffect } from "react";
import ClientCard from "../../components/clientCard/ClientCard";
import arrow from "../../assets/icons/blue-arrow.webp";
import "./ServicesStyles.scss";

const ServicesContentFour = () => {
  const data = [
    {
      name: "Dudley Leelananda",
      rev: "“He is a trusted advisor, an excellent negotiator and a person with excellent communication skills.”",
      link: "https://www.youtube.com/watch?v=47Kw96zbUkA",
      des: "Group Financial Consultant at Hijazi & Ghosheh",
      des2: "Group Former Credit Risk Consultant at HSBC - Jordan",
    },
    {
      name: "Ushan & Piumie Liyanage",
      rev: "“He never influenced or preasurized us. Information was given, but it’s our own decision.”",
      link: "https://www.youtube.com/watch?v=HoC-XXBEDvU&t=10s",
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
      link: "https://www.youtube.com/watch?v=5VG5JPTOJ0U&t=3s",
      des: "Chief Operating Officer at NKAR Travels & Tours (Pvt) Ltd, Senior Lecturer/Course ",
      des2: "Director at National School of Business Managment (NSBM)",
    },
  ];
  let slideIndex = 1;

  useEffect(() => {
    showDivs(slideIndex);
  }, []);

  const showDivs = (n) => {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  };

  const plusDivs = (n) => {
    showDivs((slideIndex += n));
  };

  return (
    <div className="ServicesContentFiveMain" id="home-video">
      <div className="ServicesContentFive">
        <div className="grid-container">
          {data.map((item) => {
            return (
              <ClientCard
                key={item.name}
                name={item.name}
                rev={item.rev}
                link={item.link}
                des={item.des}
                des2={item.des2}
              />
            );
          })}
        </div>
        <div className="single-container">
          {data.map((item) => {
            return (
              <div className="mySlides" key={item.name}>
                <ClientCard
                  name={item.name}
                  rev={item.rev}
                  link={item.link}
                  des={item.des}
                  des2={item.des2}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="arrow-btn-container">
        <div onClick={() => plusDivs(-1)} className="arrow-div-1">
          <img alt="" src={arrow} />
        </div>
        <div onClick={() => plusDivs(1)} className="arrow-div-2">
          <img alt="" src={arrow} />
        </div>
      </div>
    </div>
  );
};
export default ServicesContentFour;
