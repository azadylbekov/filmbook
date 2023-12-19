import { FaSearch } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { setSearchCanvas } from "@/store/reducers/offcanvasSlice";

const HeaderMobSearchButton = () => {
  const dispatch = useAppDispatch();

  const showIsSearchCanvas = () => {
    dispatch(setSearchCanvas(true))
  }

  return (
    <button onClick={showIsSearchCanvas} className="block lg:hidden">
      <FaSearch className="text-2xl text-black dark:!text-white" />
    </button>
  );
};

export default HeaderMobSearchButton;
