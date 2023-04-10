import { SVGProps } from "react";
const MenuBarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="w-6 h-6 text-white"
    stroke="currentColor"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="current"
      d="M4 6h16M4 12h16M4 18h16"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export default MenuBarIcon;
