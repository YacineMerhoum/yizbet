import { useEffect, useRef, useState } from "react"

const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      options
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [options])

  return [observerRef, isVisible]
};

export default useIntersectionObserver
