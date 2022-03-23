import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./CustomLink.module.scss";

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={styles.menuName}
        style={
          match
            ? {
                borderBottom: "4px solid #fff",
                color: "#fff",
              }
            : {}
        }
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
