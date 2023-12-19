import { FC } from "react";

interface OverviewProps {
	overview: string | undefined;
}

const Overview: FC<OverviewProps> = ({ overview }) => {
  return (
    <div className="lg:my-5 my-3">
      <h3 className="dark:text-[#ffffff] text-[#000000] lg:text-2xl text-xl lg:mb-5 mb-3">
        Overview
      </h3>
      <p className="dark:text-[#ffffff] text-[#000000] lg:text-xl text-md">
        {overview}
      </p>
    </div>
  );
};

export default Overview;
