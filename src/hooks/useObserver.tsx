import { useEffect } from "react";

export default function useObserver(observerRef, fetchFunction) {


  useEffect(() => {
		// if (!observerRef) {
		// 	return;
		// }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchFunction();
        }
      }, { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef]);
}
