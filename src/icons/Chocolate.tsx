interface ChocolateIconInterface {
    filled?: any;
    size?: any;
    fill?: any;
    height?: any;
    width?: any;
    label?: any;
}

export const ChocolateIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}: ChocolateIconInterface) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x="5" y="5" width="14" height="14" rx="2" fill={fill} />
            <path d="M9 5v14M15 5v14M5 9h14M5 15h14" stroke="white" strokeWidth="1.5" />
        </svg>
    );
};
