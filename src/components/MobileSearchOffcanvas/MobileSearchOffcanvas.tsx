import { useState, useCallback, useEffect, useTransition } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsXLg } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useLazyGetSearchResultsQuery } from "@/services/FilmBookService";
import SearchResultDropdown from "@/components/SearchResultDropdown/SearchResultDropdown";
import { createPortal } from "react-dom";

export default function MobileOffcanvas({
  isSearchCanvasOpen,
  mobInputStyles,
  setIsSearchCanvasOpen,
  closeSearchCanvas,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchValueClear, setIsSeachValueClear] = useState(true);
  const [isSearchDropdownShow, setIsSearchDropdownShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  const debounce = useDebounce();

  const [getSearchResultsTrigger, searchResultsData] =
    useLazyGetSearchResultsQuery();
  const {
    data: result,
    isFetching: isResultLoading,
    error: resultError,
  } = searchResultsData;

  useEffect(() => {
    if (!isResultLoading && searchResultsData.status == "fulfilled") {
      const results = result.results.slice(0, 3);
      setSearchResults(results);

      setIsSearchDropdownShow(true);
    }
  }, [searchResultsData]);

  useEffect(() => {
    setSearchValue('');
    setSearchResults([]);
    setTimeout(() => {
      setIsSearchDropdownShow(false);
    }, 500)
  }, [location.state])

  const searchChange = useCallback((e) => {
    let inputValue = e.target.value;
    let trimmedInputValue = inputValue.trim()

    setIsSearchDropdownShow(false);
    debounce(() => fetchSearchResult(trimmedInputValue), 1000);
    setSearchValue(inputValue);
  }, []);

  const fetchSearchResult = (inputValue) => {
    if (!inputValue) {
      setIsSearchDropdownShow(false);
      return;
    }

    setIsSearchDropdownShow(true);
    setSearchResults([]);
    getSearchResultsTrigger({ query: inputValue, page: 1 }, false);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    // setIsSearchDropdownShow(false);
    navigate("/search", { state: { query: searchValue } });
  };

  const clearSearch = () => {
    setTimeout(() => {
      setSearchResults([]);
      setSearchValue("");
      setIsSearchDropdownShow(false);
    }, 100);
  };

  useEffect(() => {
    let isClear = searchValue.trim().length > 0;
    setIsSeachValueClear(!isClear);
  }, [searchValue]);

  // const modalRoot = document.getElementById("modal-root");

  // const portal = createPortal(
  //   <SearchResultDropdown
  //     searchResults={searchResults}
  //     searchValue={searchValue}
  //     extraClasses={"!top-[97px] text-white !border-none"}
  //     isLoading={isResultLoading}
  //   />,
  //   modalRoot
  // );

  return (
    <Offcanvas
      className="!h-[97px] border-0 bg-black"
      show={isSearchCanvasOpen}
      onHide={setIsSearchCanvasOpen}
      placement="top"
    >
      <Offcanvas.Body className="flex justify-center">
        <div className="flex items-center w-full">
          <form className="mr-3 grow relative" onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className={
                mobInputStyles + " w-full pl-2 py-2 rounded-lg outline-none"
              }
              onChange={searchChange}
              value={searchValue}
            />
            {!isSearchValueClear && (
              <button type="button" onClick={clearSearch}>
                <BsXLg
                  className="text-xl text-white ml-2 absolute top-[10px] right-3"
                  style={{ zIndex: "2000" }}
                />
              </button>
            )}
          </form>
          {/* <FaSlidersH className="text-3xl text-white" /> */}
          <button onClick={closeSearchCanvas}>
            <BsXLg className="text-3xl text-white ml-4" />
          </button>
        </div>
      </Offcanvas.Body>
      {isSearchDropdownShow && (
        <SearchResultDropdown
          searchResults={searchResults}
          searchValue={searchValue}
          extraClasses={"!top-[97px] text-white !border-none !rounded-none"}
          isLoading={isResultLoading}
        />
      )}
    </Offcanvas>
  );
}
