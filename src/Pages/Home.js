import React from "react";
import Navbar from "../Components/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "../Components/Carousel";
import Carousel2 from "../Components/Carousel2";
import Section from "../Components/Section";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
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
      <Section/>
      <Footer />

    </>
  );
};

export default Home;
