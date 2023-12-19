import { Link } from "react-router-dom";
import emptyAvatar from "@/assets/images/emptyAvatar.webp";
import { ICredit } from "@/types/types";
import { FC } from 'react';

interface CreditItemProps { 
  person: ICredit
}

const CreditItem: FC<CreditItemProps> = ({ person }) => {

  const personImg = (person: ICredit) => {
    let personImg = person.profile_path
      ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
      : emptyAvatar;
    return personImg;
  };

  return (
    <div className="w-40">
      <Link
        className="flex flex-col items-center hover:-translate-y-5 duration-300"
        to={`/person/${person.id}`}
      >
        <div className="relative text-center lg:w-40 lg:h-40 h-32 w-32 rounded-[100%] overflow-hidden">
          <img
            className="absolute object-contain"
            src={personImg(person)}
            alt=""
          />
        </div>
        <div className="mt-2 text-center">
          <h4 className="dark:text-[#ffffff] text-[#000000] text-lg">{person.name}</h4>
          <h4 className="text-gray-400 text-lg">{person.character}</h4>
          <h3 className="text-gray-400 text-md">
            {person.known_for_department}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default CreditItem;