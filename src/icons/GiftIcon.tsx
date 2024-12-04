export const GiftIcon = ({
  fill = 'currentColor',
  size = 24,
  height,
  width,
  ...props
}: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect x="4" y="8" width="16" height="12" rx="2" ry="2" fill={fill} />
      <path
        d="M2 8h20v2H2V8ZM12 2c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3Zm3 3h7v2h-7V5Zm-6 0H2v2h7V5Z"
        fill={fill}
      />
    </svg>
  );
};
