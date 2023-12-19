import { FC, useState } from "react";
import emptyAvatar from "@/assets/images/empty_avatar.webp";
import { IPerson } from "@/types/types";
import Info from "./Info";
import Biography from "./Biography";

interface AboutProps {
  person: IPerson
}

const About: FC<AboutProps> = ({ person }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  let personImg;
  if (person) {
    personImg = person.profile_path
      ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
      : emptyAvatar;
  }

  return (
    <div className="flex md:!flex-nowrap flex-wrap">
      <div className="md:w-[300px] shrink-0 mr-10 md:h-[400px] w-[225px] h-[300px] relative overflow-hidden md:mb-0 mb-4">
        <img
          className="rounded absolute w-full h-full object-cover"
          src={personImg}
          alt=""
        />
      </div>
      <div className="sm:max-md:block hidden">
        <Info person={person} />
      </div>
      <div>
        <div className="sm:max-md:hidden block">
          <Info person={person} />
        </div>
        <Biography
          biography={person?.biography}
          showMore={showMore}
          setShowMore={setShowMore}
        />
      </div>
    </div>
  );
};

export default About;
