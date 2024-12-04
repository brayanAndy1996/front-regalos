export const BreakfastIcon = ({
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
        <circle cx="12" cy="12" r="6" fill={fill} />
        <circle cx="12" cy="12" r="3" fill="white" />
        <path d="M4 18h16v2H4v-2Z" fill={fill} />
        <rect x="3" y="4" width="6" height="2" fill={fill} />
        <rect x="15" y="4" width="6" height="2" fill={fill} />
      </svg>
    );
  };
  