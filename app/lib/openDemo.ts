export const openDemo = () =>
  typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("open-demo"));
