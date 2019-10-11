import React from "react";
import Popup from "reactjs-popup";
import Keywords from "../Keywords/Keywords.js"

const BookmarksItem = (props) => {
    return (

        <tr className="bookmarks-item">
            <td><a href={props.bookmarks.url}>{props.bookmarks.url}</a></td>
            <td>{props.bookmarks.title}</td>
            <td>{props.bookmarks.author_name}</td>
            <td>{props.bookmarks.added_date}</td>
            <td>
            <Popup trigger={<button>Modifier</button>} modal>
            {close=>(
                <div className="modal">        
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                <div className="header"> Modifier les informations </div>
                    <Keywords 
                        key={props.bookmarks.url}
                        url={props.bookmarks.url}
                    />
                    <div>
                        <p>Modifer le lien :</p>
                        <input type="url" name={props.bookmarks.url} value={props.valueOnmodify} onChange={props.handleChangeModify} placeholder="URL photo ou video"/>
                        <button onClick={()=> props.modifyBookmarks(props.bookmarks.url)}>Changer URL</button>
                    </div>
                </div>
                )}
            </Popup>
            <button className='btn-suppr' onClick={() => props.handleDelete(props.bookmarks.url)}>Supprimer</button>
            </td>
        </tr>
    )    
}

export default BookmarksItem