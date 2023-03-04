import React from "react";
import tw from 'twin.macro';
const Container = tw.div`m-4 p-2`;


const Footer = () => {
  return (
    <Container>
      <p>by <a href="https://azharrizki.netlify.com">Azharrizki</a> &copy; 2023</p>
    </Container>
  );
};

export default Footer;
