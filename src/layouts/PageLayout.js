/* eslint-disable react/prop-types */
import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import tw from 'twin.macro';


const PageContainer = tw.div`max-w-7xl mx-auto px-4 sm:px-6`;

const PageLayout = (props) => {
  const { children } = props;

  return (
    <PageContainer>
      <Header />
      {children}
      <Footer />
    </PageContainer>
  );
};

export default PageLayout;
