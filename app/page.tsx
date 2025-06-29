import { Metadata } from "next";

import React from "react";
import HomePageElement from "./HomePageElement";

const HomePage = () => {
  return <HomePageElement />;
};

export default HomePage;

export const metadata: Metadata = {
  title: "Echo Interview",
};
