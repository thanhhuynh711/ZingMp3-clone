import React, { memo } from "react";
import { Triangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <Triangle
      height="80"
      width="80"
      color="#6b6b6b"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default memo(Loading);
