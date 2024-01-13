import cx from 'classnames';
import './button.css'
export default function Button({
    children,
    className,
    id,
    style,
    type,
    onClick

}){


    return (
        <button
            id={id}
            style={style}
            type={type}
            className={cx('button', className)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}