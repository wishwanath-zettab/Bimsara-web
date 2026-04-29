import React, { useEffect } from "react";
import "./mobileMemberCardStyles.scss";
import arrow from "../../../assets/icons/blue-arrow.webp";
import member1 from "../../../assets/images/member-1.webp";
import member2 from "../../../assets/images/member-2.webp";
import member3 from "../../../assets/images/member-3.webp";
import member4 from "../../../assets/images/member-4.webp";
import member5 from "../../../assets/images/member-5.webp";
import member6 from "../../../assets/images/member-6.webp";
const MobileMemberCard = () => {
  const data = [
    {
      id: 1,
      name: "Bimsara Gamage",
      pos: "Managing Director/ CEO",
      quote:
        "“Although we are in the service provider business, I always visualize our operation similar to a production process in the manufacturing industry that runs on a conveyor belt system.  The seamless flow of perfect coordination between departments ensuring efficiency with stringent quality checks at all points, I believe, is the greatest strength we have built as a team now.”",
      des: "Bimsara counts over 15 years of experience involving hudreds of Real Estate mediation as a licensed broker and an auctioneer. His initial entry was as an investor and a developer and that involvement has made him conversant with all legal procedures as well as local authority and UDA regulations.",
      des2: "Bimsara has been tested in many environments for honesty and integrity and the testimonials issued by his real estate clients speak volumes of Bimsara’s ability, capacity, passion and his uncompromising commitment to rise to the top in the real estate business.",
      des3: "",
      img: member1,
      link: "https://www.linkedin.com/in/bimsara-b-gamage-5b0b832a/",
    },
    {
      id: 2,
      name: "Vinuri Liyanagamage",
      pos: "Head of Operations",
      quote:
        "“I see the company as far more than a real estate broker but is a responsible and ethical body that is well specialized in treating the data right with the intention of producing the right outcome.”",
      des: "Vinuri works towards achieving company objectives by overseeing all operations, managing people, implementing tech solutions and it doesn't end there!",
      des2: "She relentlessly dedicated her time in studying the business processes of this unique industry to re-engineer the processes & better serve our clients by embracing tech.",
      des3: "In her spare time, she enjoys designing UI/UX and of course, the company benefits from her skills in digital designing. Vinuri is obsessed with data management and also ensures it happens across the organization.",
      img: member2,
      link: "https://www.linkedin.com/in/vinuri-liyanagamage",
    },
    {
      id: 3,
      name: "Evantha Divulwewa",
      pos: "Manager - Transactions",
      quote:
        "“I believe that with the quality of work & ethics of the company that are inculcated to a small team, we are delivering a service way above the industry standards.In this backdrop, continuous guidance and our adaptability will enable me to grow my career further and the company to achieve its objectives.”",
      des: "Evantha is entrusted with the responsibility of a vital phase in the business process; managing and coordinating confirmed sales leading to a successful and efficient close. He is the key facilitator for multiple parties involved in all transactions.",
      des2: "Although he comes from a different industry having obtained his degree in the Hospitality Trade, with the constant guidance and mentoring, he made a fine and a responsible business manager for the company.",
      des3: "",
      img: member3,
      link: "https://lk.linkedin.com/in/evantha-divulwewa-b9007690",
    },
    {
      id: 4,
      name: "Punsiri Wijekoon",
      pos: "Field Coordinator",
      quote:
        "“The company is a place for self-improvement. I enjoy great benefits and work - life balance here at Safetynet.”",
      des: "Punsiri is a front-liner of Safetynet (Private) Limited. He facilitates client visits and gets involved in the initial property evaluation and grading.",
      des2: "He comes with accountancy and procurement experience. Our property procurement process is much influenced by his contribution in helping to better understand the nature and status of the properties strictly maintaining the compliance standards set by the management.",
      des3: "",
      img: member4,
      link: "https://www.linkedin.com/in/punsiri-wijekoon-745b6579/",
    },
    {
      id: 5,
      name: "Hansi Ranasinghe",
      pos: "Division Manager - Apartments",
      quote:
        "“The company has made the brand name by not only analyzing the situations correctly but also timely forecasting the opportunities available with the market trends. The experience gained by handling a property as a project is the best practice a broking company can promote to its employees.”",
      des: "Hansi comes with hands-on experience and knowledge in sales and marketing. She manages the apartments division overlooking property procurement, marketing activities and sales. . Her level of attention to detail serves well in identifying the requirements of the clients to provide them the best solutions while adding value by saving their valuable time.",
      des2: "Hansi holds a BSc  in Industrial Management and Statistics. Currently she is reading for her Masters in Applied Statistics.",
      des3: "",
      img: member5,
      link: "https://www.linkedin.com/in/hansi-gangadhari-ranasinghe-5968b9163",
    },
    {
      id: 6,
      name: "Nadeesha Weerathunga",
      pos: "Division Manager - Houses",
      quote:
        "“Aiming at Increasing the productivity and establishing the credentials as a Real Estate industry expert by improving the  skills and providing better service to the customers.”",
      des: "Nadeesha manages the houses division overlooking property procurement, marketing activities and sales. She comes with research experience and adds value to each project through that.",
      des2: "Nadeesha holds BSc(Special) in Agricultural Technology and Management and loves social service. She believes that ongoing practice, reading, reflection, asking for feedback and integrating them into behavior are crucial to become successful in achieving.",
      des3: "",
      img: member6,
      link: "https://www.linkedin.com/in/nadeesha-weerathunga-8535421a6",
    },
  ];
  let slideIndex = 1;

  useEffect(() => {
    showDivs(slideIndex);
  }, []);
  const showDivs = (n) => {
    var i;
    var x = document.getElementsByClassName("mySlides1");
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
    <div className="mobileMemberCard">
      <div className="inner-mobile-Card">
        {data.map((item) => {
          return (
            <div className="inner-content mySlides1" key={item.id}>
              <div className="img-container">
                <div className="img-div">
                  <a href={item.link} target="_blank" rel="noopener noreferrer"><img alt="" src={item.img} className="img-div" /></a>
                </div>
                <div className="cont">
                  <a href={item.link} target="_blank" rel="noopener noreferrer"><div className="member-name">{item.name}</div></a>
                  <div className="designation">{item.pos}</div>
                </div>
              </div>

              <div className="quote">{item.quote}</div>
              <div className="about-text">{item.des}<br></br>{item.des2}<br></br>{item.des3}</div>
            </div>
          );
        })}
      </div>
      <div className="arrow-btn-container">
        <div className="arrow-div-1" onClick={() => plusDivs(-1)}>
          <img alt="" src={arrow} />
        </div>
        <div className="arrow-div-2" onClick={() => plusDivs(1)}>
          <img alt="" src={arrow} />
        </div>
      </div>
    </div>
  );
};
export default MobileMemberCard;
