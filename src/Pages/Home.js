import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "../Components/Carousel";
import Carousel2 from "../Components/Carousel2";
import Section from "../Components/Section";
import Footer from "../Components/Footer";
import SectionPub from "../Components/SectionPub";
import MyFunBet from "../Components/MyFunBet";
import PaymentDisplay from "../Components/PaymentDisplay";
import PaymentRefused from "../Components/PaymentRefused";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [showPaymentDisplay, setShowPaymentDisplay] = useState(false);
  const [showPaymentRefused, setShowPaymentRefused] = useState(false);

  useEffect(() => {
   
    if (location.search.includes("success=true")) {
      setShowPaymentDisplay(true);
    } else if (location.search.includes("canceled=true")) {
      setShowPaymentRefused(true);
    }
  }, [location]);

  useEffect(() => {
    if (showPaymentDisplay) {
      const timeout = setTimeout(() => {
        setShowPaymentDisplay(false);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [showPaymentDisplay]);

  useEffect(() => {
    if (showPaymentRefused) {
      const timeout = setTimeout(() => {
        setShowPaymentRefused(false);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [showPaymentRefused]);

  return (
    <>
      {showPaymentDisplay && <PaymentDisplay />}
      {showPaymentRefused && <PaymentRefused />}
      <Navbar />
      <Row>
        <Col md={6}>
          <div style={{ backgroundColor: "lightgray", padding: "20px" }}>
            <Carousel />
          </div>
        </Col>
        <Col md={6}>
          <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
            <Carousel2 />
          </div>
        </Col>
      </Row>
      <Section />
      <SectionPub />
      <div style={{ transition: 'opacity 0.5s' }}>
        <MyFunBet />
      </div>
      <Footer />
    </>
  );
};

export default Home;
