import type { SVGProps } from 'react';

export function VencorpiaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
        opacity=".2"
      />
      <path
        fill="currentColor"
        d="M216.72 112.28a88.002 88.002 0 0 1-164.06 43.1.81.81 0 0 0-.12.12c-.06.07-.11.13-.17.2a88 88 0 0 1 127-103.38.75.75 0 0 0 .15-.14c.05-.06.1-.13.15-.19a87.41 87.41 0 0 1 37.05 60.3Z"
      />
    </svg>
  );
}
