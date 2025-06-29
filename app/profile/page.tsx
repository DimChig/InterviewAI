import React from "react";
import UserContextForm from "./UserContextForm";
import { Metadata } from "next";

const PageUserContext = () => {
  return <UserContextForm />;
};

export default PageUserContext;

export const metadata: Metadata = {
  title: "Chat - Echo Interview",
};
