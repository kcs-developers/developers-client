import { SVGProps } from "react";
const ViewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="current"
    height="current"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="current"
      d="M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
    />
    <path
      fill="current"
      fillRule="evenodd"
      d="M12 5.5c-2.618 0-4.972 1.051-6.668 2.353-.85.652-1.547 1.376-2.036 2.08-.48.692-.796 1.418-.796 2.067 0 .649.317 1.375.796 2.066.49.705 1.186 1.429 2.036 2.08C7.028 17.45 9.382 18.5 12 18.5c2.618 0 4.972-1.051 6.668-2.353.85-.652 1.547-1.376 2.035-2.08.48-.692.797-1.418.797-2.067 0-.649-.317-1.375-.797-2.066-.488-.705-1.185-1.429-2.035-2.08C16.972 6.55 14.618 5.5 12 5.5ZM8.25 12a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ViewIcon;
