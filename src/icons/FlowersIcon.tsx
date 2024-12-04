export const FlowersIcon = ({
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
        <circle cx="12" cy="8" r="3" fill={fill} />
        <path
          d="M9 14a3 3 0 1 1 6 0c0 3-3 8-3 8s-3-5-3-8Z"
          fill={fill}
        />
        <circle cx="7" cy="5" r="2" fill={fill} />
        <circle cx="17" cy="5" r="2" fill={fill} />
        <circle cx="5" cy="10" r="2" fill={fill} />
        <circle cx="19" cy="10" r="2" fill={fill} />
      </svg>
    );
  };
  