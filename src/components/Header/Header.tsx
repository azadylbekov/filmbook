import { useState, useCallback, useEffect, useRef } from "react";
import Container from "../Container";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import styles from "./Header.module.scss";
import { Fade as Hamburger } from "hamburger-react";
import SearchResultDropdown from "@/components/SearchResultDropdown/SearchResultDropdown";
import MobileSearchOffcanvas from "../MobileSearchOffcanvas/MobileSearchOffcanvas";
import NavLinks from "../NavLinks/NavLinks";
import MobileNavOffcanvas from "../MobileNavOffcanvas/MobileNavOffcanvas";
import Logo from "../Logo/Logo";
import {
  useLazyGetNewGuestSessionIdQuery,
  useLazyGetSearchResultsQuery,
} from "@/services/FilmBookService";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { BsXLg } from "react-icons/bs";

export default function Header() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isSearchCanvasOpen, setIsSearchCanvasOpen] = useState(false);

  const closeOffcanvas = () => setIsOffcanvasOpen(false);
  const showOffcanvas = () => setIsOffcanvasOpen(true);
  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);

  const showIsSearchCanvas = () => setIsSearchCanvasOpen(true);
  const closeSearchCanvas = () => setIsSearchCanvasOpen(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isSearchDropdownShow, setIsSearchDropdownShow] = useState(false);

  const [getNewSessionTrigger, getNewSessionData] =
    useLazyGetNewGuestSessionIdQuery();
  const {
    data: newSessionId,
    isLoading: isNewSessionLoading,
    error: isNewSessionError,
  } = getNewSessionData;

  const navigate = useNavigate();
  const location = useLocation();

  const debounce = useDebounce();

  const dispatch = useDispatch();


  // useEffect(() => {
  //   const query = location.search;
  //   const regex = "=([^;]*)&";
  //   const requestToken = query.match(regex);
  //   if (requestToken) {
  //     createSession(requestToken[1]);
  //   }
  // }, []);

  // const createSession = (requestToken) => {
  //   api
  //     .post("authentication/session/new", {
  //       request_token: requestToken,
  //     })
  //     .then((data) => {
  //       console.log("session data", data);
  //     });
  // };
  let triggerRef = useRef(null);
  let timeoutRef = useRef(null);
  let inputRef = useRef(null);

  useEffect(() => {
    setSearchValue('');
    if (triggerRef.current) {
      triggerRef.current.abort()
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setSearchResults([]);
    setTimeout(() => {
      setIsSearchDropdownShow(false);
    }, 500)
  }, [location.state])


  const [getSearchResultsTrigger, searchResultsData] =
    useLazyGetSearchResultsQuery();
  const {
    data: result,
    isFetching: isResultLoading,
    error: resultError,
  } = searchResultsData;

  const searchChange = useCallback((e) => {
    let inputValue = e.target.value;
    let trimmedInputValue = inputValue.trim()

    setIsSearchDropdownShow(false);
    timeoutRef.current = debounce(() => fetchSearchResult(trimmedInputValue), 1000);
    setSearchValue(inputValue);
  }, []);

  const fetchSearchResult = (inputValue) => {
    if (!inputValue) {
      setIsSearchDropdownShow(false);
      return;
    }

    setIsSearchDropdownShow(true);
    setSearchResults([]);
    triggerRef.current = getSearchResultsTrigger({ query: inputValue, page: 1 }, true);
  };

  useEffect(() => {
    if (!isResultLoading && searchResultsData.status == "fulfilled") {
      const results = result.results.slice(0, 3);
      setSearchResults(results);

      setIsSearchDropdownShow(true);
    }
  }, [searchResultsData]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    const navReturn = navigate("/search", { state: { query: searchValue } });
    setIsSearchDropdownShow(false);
  };

  useEffect(() => {
    if (!isNewSessionLoading && getNewSessionData.status == "fulfilled") {
      const guestSessionId = newSessionId.guest_session_id;
      localStorage.setItem("guestSessionId", guestSessionId);
    }
  }, [isNewSessionLoading, getNewSessionData]);

  const onLogin = () => {
    getNewSessionTrigger();
  };

  const formOnBlur = () => {
    setTimeout(() => setIsSearchDropdownShow(false), 200);
  };

  const clearInput = () => {
    setSearchValue("");
  }

  return (
    <header className="bg-black border-b !border-[#3c3c3c] fixed top-0 left-0 right-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-4 text-white">
          <div className="flex items-center">
            <div className="block xl:hidden mr-6">
              <Hamburger toggled={isOffcanvasOpen} toggle={toggleOffcanvas} />
            </div>
            <div className="flex items-center">
              <Logo />
              <div className="hidden 2xl:block">
                <ul className="flex gap-x-5">
                  <NavLinks classes="text-white text-lg" />
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center" onBlur={formOnBlur}>
            <form
              onSubmit={onSearchSubmit}
              className={styles.headerSearchForm + " mr-6 hidden lg:block"}
            >
              <input
                type="text"
                className={styles.headerSearch}
                placeholder="Search movies..."
                onChange={searchChange}
                value={searchValue}
                ref={inputRef}
              />
              {searchValue && <span onClick={clearInput} className="absolute top-2 right-3 cursor-pointer">
                <BsXLg className="text-2xl text-white ml-4" />
              </span>}
              {!isResultLoading && !searchValue && (
                <button onSubmit={onSearchSubmit}>
                  <FaSearch className={styles.headerInputIcon + " right-3"} />
                </button>
              )}
              {isSearchDropdownShow && (
                <SearchResultDropdown
                  searchResults={searchResults}
                  searchValue={searchValue}
                  extraClasses={""}
                  isLoading={isResultLoading}
                />
              )}

            </form>
            <h3 className="mr-6 text-xl">RU</h3>
            <button
              onClick={onLogin}
              className="green-gradient hidden lg:block hover:bg-hover-green duration-300 text-white font-medium px-8 py-1 rounded"
            >
              login
            </button>
            <button onClick={showIsSearchCanvas} className="block lg:hidden">
              <FaSearch className="text-2xl" />
            </button>
          </div>
        </div>
      </Container>
      <MobileNavOffcanvas
        isOffcanvasOpen={isOffcanvasOpen}
        closeOffcanvas={closeOffcanvas}
      />
      <MobileSearchOffcanvas
        isSearchCanvasOpen={isSearchCanvasOpen}
        mobInputStyles={styles.mobInput}
        setIsSearchCanvasOpen={setIsSearchCanvasOpen}
        closeSearchCanvas={closeSearchCanvas}
      />
    </header>
  );
}