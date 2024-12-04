interface JoyaIconInterface {
    filled?: any
    size?: any
    fill?: any
    height?: any
    width?: any
    label?: any
}

export const JoyaIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}: JoyaIconInterface) => {
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
                d="M12 2l4 6h-8l4-6Zm0 20L2 8l5 4 5 10 5-10 5-4-10 14Z"
                fill={fill}
            />
        </svg>
    );
};
