interface PelucheIconInterface {
    filled?: any;
    size?: any;
    fill?: any;
    height?: any;
    width?: any;
    label?: any;
}

export const PelucheIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}: PelucheIconInterface) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={filled ? fill : 'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="12" cy="14" r="5" fill={fill} />
            <circle cx="9" cy="10" r="2" fill={fill} />
            <circle cx="15" cy="10" r="2" fill={fill} />
            <circle cx="8" cy="5" r="2" fill={fill} />
            <circle cx="16" cy="5" r="2" fill={fill} />
            <path d="M10 14h4a2 2 0 0 1-2 2 2 2 0 0 1-2-2Z" fill={fill} />
        </svg>
    );
};

