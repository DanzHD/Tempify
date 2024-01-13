import cx from "classnames";
import './flex.css'
export default function Flex({
    children,
    style,
    className,
    id
 }) {


    return (
        <>
            <div style={style} id={id} className={cx(className, 'flex')}>{children}</div>
        </>
    )
}