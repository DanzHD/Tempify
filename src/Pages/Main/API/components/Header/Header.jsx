import Button from "../../../../../Common/Components/Button/Button.jsx";
import './header.css'
import Text from "../../../../../Common/Components/Text/Text.jsx";
export default function Header({logo, description, signOut}) {

    return (
        <div className='header'>
            <div>{logo}</div>
            <Text heading>{description}</Text>
            <Button onClick={signOut}>
                <span className='material-symbols-outlined'>logout</span>
                <div>Sign out</div>
            </Button>
        </div>
    )

}