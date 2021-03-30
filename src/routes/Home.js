import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import Weet from 'routes/Weet';

const Home = ({ userObj }) => {   
    console.log(userObj);

    const [neweet, setNeweet] = useState("");
    const [weets,setWeets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {   
        dbService.collection('fb-tweets').onSnapshot(snapshot => {
            const weetsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setWeets(weetsArray);
        });
    }, []);

    // const getWeets = async() => {

    //     const dbWeets = await dbService.collection('fb-tweets').get();

    //     dbWeets.forEach((doc) => {
    //         const weetObj = {
    //             ...doc.data(),
    //             id : doc.id,
    //             createdAt : doc.createdAt
    //         };
    //         setWeets((prev) => [weetObj, ...prev] );
    //     });

    // };

    const onSubmit = async(event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const neweetObj = {
            text : neweet,
            createdAt : Date.now(),
            createdId : userObj.uid,
            attachmentUrl
        };
        await dbService.collection('fb-tweets').add(neweetObj);
        setAttachment("");
        setNeweet("");
    };

    const onChange = (event) => {
        const {target : { value }} = event;
        setNeweet(value);
    };

    const onFileChange = (event) => {
        const {target : { files }} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : { result }} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);

    };

    const onClearAttachmentClick = () => {
        setAttachment(null);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={neweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
                <input type="file" accept="imgage/*" onChange={onFileChange} />
                <input type="submit" value="neweet" />
                { attachment && 
                    <div>
                    <img src={attachment} width="50px" height="50px"/> 
                    <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {weets.map(weet => (
                    <Weet key={weet.id} weetObj={weet} isOwner={weet.createdId === userObj.uid}/>
                ))}
            </div>
        </div>
    );

};



export default Home;