import {useEffect, useState} from "react";
import './pagination.css'
import cx from 'classnames'
import Button from "../../../../Common/Components/Button/Button.jsx";
import Text from "../../../../Common/Components/Text/Text.jsx";

function Pagination({
    items,
    itemsPerPage
}) {


    const [currentPage, setCurrentPage] = useState(0);


    let totalPages = Math.ceil(items.length/itemsPerPage);
    totalPages = [...Array(totalPages).keys()];

    if (items.length === 0) {
        return (
            <div className='pagination'>

                <Text subheading> No Tracks Found :(</Text>
                <Text>There were no tracks found matching the tempo</Text>
            </div>
        )
    }

    return (
        <div className='pagination'>
            <div className='pagination_control_container pagination_control_button'>
                {
                    currentPage !== 0 &&
                        <span className='material-symbols-outlined' onClick={() => setCurrentPage(currentPage - 1)}>
                            navigate_before
                        </span>
                }
                {
                    totalPages.map(page => {

                        let classes = 'pagination_control_button ';
                        if (currentPage === page) {
                            classes += 'active';
                        }

                        return (
                            <div key={page} className={classes} onClick={() => setCurrentPage(page)}> {page + 1}</div>
                        )

                    })
                }
                {
                    (currentPage !== (totalPages.length - 1)) ?
                        <span className='material-symbols-outlined pagination_control_button' onClick={() => setCurrentPage(currentPage + 1)}>
                            navigate_next
                        </span>
                        :
                        <span style={{opacity: 0, cursor: 'none'}} className='material-symbols-outlined pagination_control_button'>
                            navigate_next
                        </span>
                }


            </div>

            {
                items.slice(currentPage * itemsPerPage, Math.min((currentPage + 1) * itemsPerPage, items.length)).map((item) => {
                    return (
                        <PaginatedRow key={item.id} item={item} />
                    )
                })
            }
        </div>
    )
}

function PaginatedRow({
    item
}) {

    const [menuOpen, setMenuOpen] = useState(false);

    const onOpenURL = () => {

        window.open(`https://open.spotify.com/track/${item.id}`)
    }

    const onOpenURI = () => {
        window.open(item.uri);
    }

    const [enabled, setEnabled] = useState(item.enabled);

    const onChange = () => {
        setEnabled(!enabled);
    }

    useEffect(() => {
        item.enabled = enabled;
    }, [enabled]);

    return (
        <div key={item.id} className={cx('pagination_item', enabled ? '' : 'disabled')}>
            <input onChange={onChange}
                   type='checkbox'
                   className='checkbox'
                   checked={enabled}
            />

            <div className='track_image'>
                <img src={item.image} alt='Track image' />
            </div>
            <div className='track_details'>
                <div className='track_name'>{item.name}</div>
                {
                    item.artists.map(artist => {
                        return (
                            <div key={artist.id} className='track_artist'>
                                {artist.name}
                            </div>
                        )
                    })
                }
                <div className='play_on_spotify'>
                    <Button onClick={() => setMenuOpen(!menuOpen)} className='play_on_spotify_button'>
                        <i style={{fontSize: '21px', marginRight: '5px'}} className="fa fa-spotify" aria-hidden="true"></i>
                        Play on Spotify
                    </Button>
                    <div className="menu-container">

                        {
                            menuOpen &&
                                <div className="menu">
                                    <div className="menu__item" onClick={() => onOpenURI()}>
                                        <i style={{fontSize: '24px'}} className="fa fa-spotify" aria-hidden="true"></i>
                                        <Text>In the app</Text>
                                    </div>
                                    <div className="menu__item" onClick={() => onOpenURL()}>
                                        <span className="material-symbols-outlined">
                                            public
                                        </span>
                                        <Text>On the web</Text>
                                    </div>
                                </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )


}

export default Pagination;