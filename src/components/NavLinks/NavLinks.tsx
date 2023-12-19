import { Link } from "react-router-dom";
import styles from "./NavLinks.module.scss";
import { NAV_LINKS } from "@/constants/const";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect, useState, useRef, FC } from "react";

interface NavLinksProps {
  classes?: string,
  animationClass?: string
}

const NavLinks: FC<NavLinksProps> = ({ classes, animationClass = 'fadedown' }) => {
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  const isFirstRender = useRef<Boolean>(false);


  useEffect(() => {
    if (!isFirstRender.current) {
      setIsMounted(true);
      return;
    }
    const timeout = setTimeout(() => {
      setIsMounted(true);
      isFirstRender.current = true;
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <TransitionGroup component={null}>
        {isMounted &&
          NAV_LINKS.map((link, index) => (
            <CSSTransition
              key={index}
              timeout={700}
              classNames={animationClass}
              nodeRef={link.ref}
            >
              <li
                ref={link.ref}
                key={index}
                style={{ transitionDelay: 100 * index + "ms" }}
              >
                <Link
                  to={link.href}
                  className={styles.headerNavLink + " " + classes}
                >
                  {link.title}
                </Link>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
}

export default NavLinks;

