import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={430}
    viewBox="0 0 280 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="280" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="325" rx="10" ry="10" width="280" height="50" />
    <rect x="0" y="390" rx="10" ry="10" width="95" height="30" />
    <rect x="140" y="390" rx="20" ry="24" width="140" height="35" />
  </ContentLoader>
);
export default Skeleton;
