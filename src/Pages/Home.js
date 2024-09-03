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
import '../App.css'
import AccountDelete from "../Toasts/AccountDelete";
import Seo from "../Components/Seo";
import Welcome from "../Toasts/Welcome"
import WelcomeBackToast from "../Toasts/WelcomeBackToast";

const Home = () => {
  const location = useLocation();
  const [showPaymentDisplay, setShowPaymentDisplay] = useState(false)
  const [showPaymentRefused, setShowPaymentRefused] = useState(false)
  const [showDeleteToast, setShowDeleteToast] = useState(false)

  const [showToastWelcome, setShowToastWelcome] = useState(false)
  const [showWelcomeBack , setShowWelcomeBack] = useState(false)

  useEffect(() => {
    if (location.state && location.state.showWelcomeBack) {
      setShowWelcomeBack(true)
      setTimeout(() => {
        setShowWelcomeBack(false)
      }, 11000);
    }
  }, [location]);


useEffect(() => {
    if (location.state && location.state.showToastWelcome) {
      setShowToastWelcome(true)
      setTimeout(() => {
        setShowToastWelcome(false)
      }, 11000);
    }
  }, [location]);

useEffect(() => {
    if (location.state && location.state.showDeleteToast) {
      setShowDeleteToast(true)
      setTimeout(() => {
        setShowDeleteToast(false)
      }, 4000);
    }
  }, [location]);

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
      {showToastWelcome && <Welcome />   }
      {showPaymentDisplay && <PaymentDisplay />}
      {showPaymentRefused && <PaymentRefused />}
      {showDeleteToast && <AccountDelete />}
      {showWelcomeBack && <WelcomeBackToast />}
      <Seo 
        title="Yizbet - Pronostics Sportifs Payants"
        description="Bienvenue sur Yizbet, votre plateforme de pronostics sportifs payants. Rejoignez-nous pour maximiser vos gains avec nos analyses expertes."
        keywords="Yizbet, pronostics sportifs, paris payants, paris sportifs, gains"
        url="https://www.yizbet.com/"
        image="https://www.yizbet.com/images/home-banner.jpg"
      />
      <Navbar />
      <Row>
        <Col md={6}>
          <div className="caroussel1">
            <Carousel />
          </div>
        </Col>
        <Col md={6}>
          <div className="caroussel2">
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
