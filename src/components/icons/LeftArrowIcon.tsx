import { SVGProps } from "react";
const LeftArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="w-5 h-5 sm:w-6 sm:h-6 dark:text-gray-900"
      stroke="currentColor"
      aria-hidden="true"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="m15 19-7-7 7-7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  </span>
);
export default LeftArrowIcon;
