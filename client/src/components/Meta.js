import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Sneakrs",
  description:
    "Sneakrs is not just any typical e-commerce website. We are a live marketplace for buying limited edition sneakers",
  keyword: "Sneakers, Hypebeast",
};
export default Meta;
