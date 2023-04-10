import { SVGProps } from "react";
const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
      stroke="currentColor"
      aria-hidden="true"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M9 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  </span>
);
export default RightArrowIcon;
