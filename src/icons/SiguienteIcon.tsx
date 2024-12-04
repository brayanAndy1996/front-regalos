

interface IconInterface {
    filled?: any
    size?: any
    fill?:any
    height?:any
    width?:any
    label?:any
}

export const SiguienteIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
  }:IconInterface) => {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M9 18l6-6-6-6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    );
  };