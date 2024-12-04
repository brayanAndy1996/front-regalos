import NavTab from "@/components/nav/NavTab"

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>): JSX.Element {
    return (
        <div>
            <NavTab />
            {children}
        </div>
    )
}