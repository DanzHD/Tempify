import Button from "../../../../../Common/Components/Button/Button.jsx";
import './header.css'
export default function Header({logo, signOut}) {

    return (
        <div className='header'>
            <div>{logo}</div>
            <Button onClick={signOut}>
                <span className='material-symbols-outlined'>logout</span>
                <div>Sign out </div>
            </Button>
        </div>
    )

}