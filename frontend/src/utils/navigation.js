export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (!element) {
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
