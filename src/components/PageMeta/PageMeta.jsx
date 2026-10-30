import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const metadata = {
  "/": {
    title: "Psychologists Services | Find your guide",
    description: "Discover experienced psychologists and find support for your next step.",
  },
  "/psychologists": {
    title: "Psychologists | Psychologists Services",
    description: "Browse psychologists by name, price, and rating to find the right fit.",
  },
  "/favorites": {
    title: "Favorites | Psychologists Services",
    description: "Review your saved psychologists in one place.",
    noindex: true,
  },
  "/thank-you": {
    title: "Request received | Psychologists Services",
    description: "Your appointment request has been received.",
    noindex: true,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Psychologists Services",
    description: "Learn how your personal data is protected and processed.",
    noindex: true,
  },
};

const setMeta = (name, content) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
};

const PageMeta = () => {
  const { pathname } = useLocation();
  const page = metadata[pathname] || {
    title: "Page not found | Psychologists Services",
    description: "The page you requested could not be found.",
    noindex: true,
  };

  useEffect(() => {
    document.title = page.title;
    setMeta("description", page.description);
    setMeta("robots", page.noindex ? "noindex, nofollow" : "index, follow");
  }, [page]);

  return null;
};

export default PageMeta;
