import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import TrustBar from "../components/landing/TrustBar";
import ExpertiseSection from "../components/landing/ExpertiseSection";
import ServicesCarousel from "../components/landing/ServicesCarousel";
import MethodSection from "../components/landing/MethodSection";
import StackSection from "../components/landing/StackSection";
import ValuesSection from "../components/landing/ValuesSection";
import FooterContact from "../components/landing/FooterContact";
import SectionDivider from "../components/landing/SectionDivider";
import LatestPosts from "../components/landing/LatestPosts";

const HERO_IMAGE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/c23abc0d1_generated_2f4a838b.png";
const DATA_IMAGE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/e2b8caac3_generated_5851b33d.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <HeroSection heroImage={HERO_IMAGE} />
      <TrustBar />
      <SectionDivider />
      <ExpertiseSection />
      <SectionDivider />
      <ServicesCarousel />
      <SectionDivider />
      <MethodSection />
      <StackSection dataImage={DATA_IMAGE} />
      <SectionDivider />
      <ValuesSection />
      <SectionDivider />
      <LatestPosts />
      <FooterContact />
    </div>
  );
}