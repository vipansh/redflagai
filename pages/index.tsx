import { useUser } from "../context/UserContext";
import {
  Navbar,
  MetaData,
  Footer,
  FeedbackModal,
  PricingTabel,
} from "../components";
import { useEffect, useState } from "react";
import {
  CommingSoonThings,
  HeroSection,
  MeetTheDeveloper,
  Pricing,
  WhatAmISolving,
} from "../modules/landingPage";
import { motion } from "framer-motion";
import axios from "axios";
import { ProductRes } from "../types/paddle";

interface Props {
  products: ProductRes;
}

const Home = ({}: Props) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <>
      <MetaData />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
      <Navbar />
      <main className=" overflow-hidden">
        <HeroSection />
        <WhatAmISolving />
        <CommingSoonThings />
        {/* <Pricing products={products.response.products} /> */}
        <MeetTheDeveloper />
        <Footer />
      </main>
    </>
  );
};

export default Home;
