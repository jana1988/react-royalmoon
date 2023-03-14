import Full from "./full";
import Simple from "./simple";
import { isMobile } from "@/utils";

export default (props) => {
  const { mode = "full", total = 0, pageSize = 0 } = props;
  if (isMobile()) return null;
  if (total <= pageSize) return null;
  return mode === "full" ? <Full {...props} /> : <Simple {...props} />;
};
