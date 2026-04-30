export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id) => {
  if (!id || id === "root") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    return;
  }

  const element = document.getElementById(id);
  if (!element) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
};

export const navigateAndScroll = (navigate, path, targetId = "root", delay = 80) => {
  navigate(path);
  window.setTimeout(() => scrollToId(targetId), delay);
};

export const openExternal = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
