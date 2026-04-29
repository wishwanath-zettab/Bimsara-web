import React, { useEffect, useState } from "react";
import win from "../../assets/icons/Subtract.webp";
import lineImg from "../../assets/icons/line-img.webp";
import arrw from "../../assets/icons/down-arr.webp";

import "./collapsibleStyles.scss";
import BuyersContent from "../../screens/serviceScreen/buyers/buyersContent";
import SellerContent from "../../screens/serviceScreen/sellers/sellersContent";
import TenantsContent from "../../screens/serviceScreen/tenants/tenantsContent";
import LandlordContent from "../../screens/serviceScreen/landlords/landlordContent";

const Collapsible = (props) => {
  const [sellers, setSellers] = useState(true);
  const [guides, setGuides] = useState(false);
  const [visible, setVisible] = useState(true);
  //const [selectedCard, setSelectedCard] = useState(0);
  const selectedIndex = props.type === "Seller" ? 2 : 1;

  const getContent = () => {
    if (props.type === "Seller") {
      return <SellerContent selected={props.selected} mobile />;
    } else if (props.type === "Buyer") {
      return <BuyersContent selected={props.selected} mobile />;
    } else if (props.type === "Landlord") {
      return <LandlordContent selected={props.selected} mobile />;
    } else {
      return <TenantsContent selected={props.selected} mobile />;
    }
  };
  useEffect(() => {
    if (props.type !== "Seller") {
      //props.setSelected(0);
      setGuides(true);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="Collapsible">
      {props.type === "Seller" ? (
        <div className="main-container-col">
          <div className="main-cont" style={{ marginBottom: "10px" }}>
            <div className="sing-cont">
              <div
                className={`service-Card-mini ${
                  props.selected === 1 ? "border" : ""
                }`}
                style={{ fontWeight: props.selected === 1 ? "300" : "400" }}
                onClick={() => {
                  props.setSelected(1);
                  setSellers(!sellers);
                  setGuides(false);
                }}
              >
                <div className="div-img">
                  <img alt="" src={win} />
                </div>
                <div>Property Sellers</div>
              </div>
            </div>
          </div>
          {sellers && props.selected === 1 && props.type === "Seller" ? (
            <div className="content-container">
              <div className="content">
                <SellerContent selected={1} mobile />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className="main-container-col">
        <div className="main-cont" style={{ marginBottom: "10px" }}>
          <div
            className="sing-cont"
            onClick={() => {
              setGuides(!guides);
              props.setSelected(0);
              // setSelectedCard(0);
            }}
          >
            <div className="header-text">{props.type}’s Guide</div>
            <div className="arrow">
              <img
                alt=""
                src={arrw}
                style={{ transform: guides ? "rotate(180deg)" : "" }}
              />
            </div>
          </div>
          {guides ? (
            <div
              className="bottm-guide"
              style={{
                display:
                  window.screen.width > 481 &&
                  window.screen.width < 1024 &&
                  selectedCard === 0
                    ? "grid"
                    : window.screen.width > 481 &&
                      window.screen.width < 1024 &&
                      selectedCard === 1
                    ? "block"
                    : "",
              }}
            >
              {props.data.map((value, index) => {
                return (
                  <div
                    className={`guide-Card-mini ${
                      props.selected === index + selectedIndex && !visible? "border" : ""
                    }`}
                    style={{
                      display: visible
                        ? "flex"
                        : props.selected === index + selectedIndex
                        ? "flex"
                        : "none",
                      width: visible
                        ? ""
                        : props.selected === index + selectedIndex
                        ? "auto"
                        : "",
                    }}
                    onClick={() => {
                      setVisible(!visible);
                      value.onclick();
                      if (selectedCard === 0) {
                        setSelectedCard(1);
                      } else {
                        setSelectedCard(0);
                      }
                    }}
                  >
                    <div className="div-img">
                      <img alt="" src={lineImg} />
                    </div>
                    <div>{value.name}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        {(props.selected > 1 && props.type === "Seller" && !visible) ||
        (props.selected > 0 && props.type !== "Seller" && !visible) ? (
          <div className="content-container">
            <div className="content">{getContent()}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Collapsible;
