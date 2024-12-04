export const BalloonsIcon = ({
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
        <circle cx="8" cy="8" r="6" fill={fill} />
        <circle cx="16" cy="8" r="6" fill={fill} />
        <path d="M8 14v6M16 14v6" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  };
  