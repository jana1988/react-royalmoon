import useVisibilityHook from "@/hooks/useVisibilityHook";

export default function LazyLoading({ children, visible, options }) {
  const { setElement, isVisible } = useVisibilityHook({});

  return <div ref={setElement}>{isVisible && children}</div>;
}
