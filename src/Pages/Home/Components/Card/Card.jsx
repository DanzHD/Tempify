import Text from "../../../../Common/Components/Text/Text.jsx";
import './card.css'
export default function Card({
    onClick,
    style,
    text,
    heading,
    classname
}) {


    return (
        <div className='card' onClick={onClick}>
            <div className='card-heading'>
                <Text heading>{heading}</Text>
            </div>
            <div className='card-context'>
                <Text>{text}</Text>
            </div>

        </div>
    )

}