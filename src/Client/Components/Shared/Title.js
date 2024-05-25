import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Pingme",
  description = "This is a new chat app called Pingme",
}) => {
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description}></meta>
  </Helmet>;
};

export default Title;
