import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';

const Weet = ({ weetObj, isOwner }) => {

    const [editing, setEditing] = useState(false);
    const [editWeet, setEditWeet] = useState(weetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are u sure u want to delete this weet?");
        if(ok){
            await dbService.doc(`fb-tweets/${weetObj.id}`).delete();
            await storageService.refFromURL(weetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`fb-tweets/${weetObj.id}`).update({
            text : editWeet,
        });
        setEditing(false);
    };

    const onChange = (event) => {
        const {target : { value }} = event;
        setEditWeet(value);
    }

    return (
        <div>
        {editing ? (
            <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="edit your weet" value={editWeet} onChange={onChange} required />
                <input type="submit" value="Update Weet" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
            </>
        ) : (
            <>
            <h4>{weetObj.text}</h4>
            {weetObj.attachmentUrl && (
                <img src={weetObj.attachmentUrl} width="50px" height="50px" />
            )}
            {isOwner && (
                <div>
                    <button onClick={onDeleteClick}>Delete Weet</button>
                    <button onClick={toggleEditing}>Edit Weet</button>
                </div>
            )}
            </>
        )}
        </div>
    );
};

export default Weet;