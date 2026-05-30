import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import ClientCard from "../../components/clientCard/ClientCard";
import blueArrow from "../../assets/images/blue-arrow.webp";
import "./ServicesStyles.scss";

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

const ServicesContentFour = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1024
  );
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [isMobile]);

  return (
    <div className="ServicesContentFiveMain" id="home-video">
      <div className="ServicesContentFive">
        {isMobile ? (
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            slidesPerView={1}
            className="client-cards-swiper"
          >
            {data.map((item) => (
              <SwiperSlide key={item.name}>
                <ClientCard
                  name={item.name}
                  rev={item.rev}
                  link={item.link}
                  des={item.des}
                  des2={item.des2}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
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
        )}
      </div>
      {isMobile && (
        <div className="arrow-btn-container">
          <div ref={prevRef} className="arrow-div-1">
            <img src={blueArrow} alt="previous" />
          </div>
          <div ref={nextRef} className="arrow-div-2">
            <img src={blueArrow} alt="next" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesContentFour;
