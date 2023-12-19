import React, { FC } from "react";

interface HomepageLinkProps {
  homepage?: string | undefined
}

const HomepageLink: FC<HomepageLinkProps> = ({ homepage }) => {
  return (
    <>
      {homepage && (
        <a
          href={homepage}
          className="flex items-center green-gradient duration-300 rounded-lg px-4 py-3 lg:!py-2 md:py-2 md:w-[49%] lg:mr-4 md:mr-[2%] justify-center lg:justify-start lg:w-auto w-full mb-3 lg:mb-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit web page
        </a>
      )}
    </>
  );
};

export default HomepageLink;
