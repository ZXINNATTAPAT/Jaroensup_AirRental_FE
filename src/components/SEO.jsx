import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  locale = "th_TH",
  siteName = "เจริญทรัพย์แอร์เช่า",
  structuredData,
}) => {
  const location = useLocation();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://jaroensupairrental.com";
  const currentUrl = url || `${baseUrl}${location.pathname}`;
  const defaultImage = image || `${baseUrl}/images/og-image.jpg`;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic SEO Meta Tags
    if (description) {
      updateMetaTag("description", description);
    }
    
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph Meta Tags
    if (title) {
      updateMetaTag("og:title", title, true);
    }
    
    if (description) {
      updateMetaTag("og:description", description, true);
    }
    
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:image", defaultImage, true);
    updateMetaTag("og:locale", locale, true);
    updateMetaTag("og:site_name", siteName, true);

    // Twitter Card Meta Tags
    updateMetaTag("twitter:card", "summary_large_image");
    if (title) {
      updateMetaTag("twitter:title", title);
    }
    if (description) {
      updateMetaTag("twitter:description", description);
    }
    updateMetaTag("twitter:image", defaultImage);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, image, url, type, locale, siteName, structuredData, currentUrl, defaultImage]);

  return null;
};

export default SEO;
