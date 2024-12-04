interface AllGiftsIconInterface {
    filled?: any
    size?: any
    fill?: any
    height?: any
    width?: any
    label?: any
}

export const AllGiftsIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}: AllGiftsIconInterface) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        fill={filled ? fill : 'none'}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M20 7h-2.09a3.001 3.001 0 0 0-2.91-3c-.96 0-1.81.47-2.32 1.18L12 7l-.68-1.82A3.001 3.001 0 0 0 9 4c-.96 0-1.81.47-2.32 1.18L6.09 7H4a1 1 0 0 0-1 1v3h18V8a1 1 0 0 0-1-1ZM10 5c.55 0 1.04.3 1.29.76L12 8h-4l.71-2.24C8.96 5.3 9.45 5 10 5Zm4 0c.55 0 1.04.3 1.29.76L16 8h-4l.71-2.24C12.96 5.3 13.45 5 14 5ZM3 19a1 1 0 0 0 1 1h6v-8H3v7Zm7 1h4v-8h-4v8Zm5 0h6a1 1 0 0 0 1-1v-7h-7v8Z"
          fill={fill}
        />
      </svg>
    );
};
