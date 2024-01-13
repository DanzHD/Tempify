import './text.css'
export default function Text({
    children,
    style,
    heading,
    subheading
}) {
    if (heading) {
        return <h1 style={style}>{children}</h1>
    }

    if (subheading) {
        return <h2 style={style}>{children}</h2>
    }

    return <p style={style}>{children}</p>


}