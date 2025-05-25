import React from "react";
import AboutBg from "../../components/AboutSec/AboutBg";
import AboutOne from "../../components/AboutSec/AboutOne";
import AboutMid from "../../components/AboutSec/AboutMid";
import AboutTwo from "../../components/AboutSec/AboutTwo";
import AboutImage from "../../../src/assets/about-bg.png";
export default function About() {
  return (
    <>
      <AboutBg
        title="About Us"
        subtitle="Home / About Us"
        backgroundImage={AboutImage}
      />
      <AboutOne></AboutOne>
      <AboutMid></AboutMid>
      <AboutTwo></AboutTwo>
    </>
  );
}
