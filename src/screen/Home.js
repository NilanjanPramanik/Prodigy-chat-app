import { getDatabase, ref, push, set, onChildAdded, get } from "firebase/database";
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import "./Home.css";
import { Cookies } from "react-cookie";
// import Translate from "../component/Translate";
// import InputTranslate from "../component/InputTranslate";
// const axios = require('axios');

const cookies = new Cookies();

function Home() {
    const [joinName, setJoinName] = useState("")
    const [name, setName] = useState("");
    const [chat, setChat] = useState([]);
    const [messege, setMessege] = useState("");
    const [roomId, setRoomId] = useState("");
    const userImage = cookies.get("user-image");
    const [btnDisable, setBtnDisable] = useState(false);
    const [userLang, setUserLang] = useState("en");
    const [lang, setLang] = useState([]);
    // const msgKey = useRef("");
    // const [msgKey, setMsgKey] = useState(1);

    console.log(chat)
// curl - X 'GET'  -H 

    // useEffect(()=>{
    //     axios.get('https://libretranslate.com/languages',
    //         { headers: { 'accept': 'application/json' }}).then((res)=>{
    //             // console.log(res.data);
    //             setLang(res.data);
    //         })
    //     }, [])
        // console.log(lang)
        
    // console.log(joinName)
    const db = getDatabase();
    // const chatListRef = ref(db, roomId);
    const chatListRef = ref(db, "chats:"+roomId);
    // console.log(roomId)

    // if(roomId !== "chats"){
    //     setBtnDisable(false)
    // }

    // const handleSelectLang =(e)=>{
    //     console.log('hi')
    // }
    // const handleMsgKey = ()=>{
    //     console.log("hi")
    // }

    const handleSetUser = () => {
        // console.log(joinName)
        setName(joinName);

        // const setChatlist = ref(db, roomId);
        // setChat("")    
    }
    // useEffect(()=>{
    //     setChat("")
    // },[])

    // console.log(chat)
    useEffect(() => {
        setJoinName(cookies.get("user-name"))
        setChat("")
        onChildAdded(chatListRef, (data) => {
            // console.log(data.val())
            setChat(chat => [...chat, data.val()])
        });
    }, [roomId])

    const sendChat = () => {
        const chatRef = push(chatListRef);
        set(chatRef, {
            name, msg: messege, langCode: userLang
        });
        setMessege("");
    }

    
    return (
        <div className='home'>


            {

                name === "" ? (
                    <div className="userName__container">
                        <input
                            type="text"
                            value={joinName}
                            placeholder="Enter your user name"
                            onChange={(e) => {
                                setJoinName(e.target.value)

                            }}
                        />
                        <input
                            type="text"
                            placeholder="Enter Room Id"
                            onChange={(e) => setRoomId("chats:" + e.target.value)}
                        />
                        <button disabled={btnDisable} onClick={handleSetUser}>Join chat</button>
                    </div>
                ) : (
                    <>
                        <div className='container'>

                            <div className='navbar'>
                                <div className="userDetails__container">
                                    <p>Welcome {name}</p>
                                    <p>{roomId}</p>
                                    <div className="image__container">
                                        <img src={userImage} alt="avater"/>
                                    </div>
                                </div>
                            </div>

                            <div className='chat__body'>
                                {
                                    chat === "" ? (
                                        <div className="first__msg">Start chatting...</div>
                                        ) : (
                                            chat.map((chat, i) =>

                                                <div className={`chat ${chat.name === name ?
                                                    "me" : ""}`} key={i}>

                                                    <h4>{chat.name}</h4>
                                                    <div className={`msg__container ${chat.name === name ? "owner__style" : ""} `}>
                                                        <p className={`msg ${chat.name === name ? "own" : ""}`}>{chat.msg}</p>
                                                        {/* <Translate roomId={roomId} userLang={userLang} chats={chat} /> */}
                                                    </div>
                                                </div>
                                            )
                                        ) 
                                }

                                
                                {/* {console.log(msgKey)} */}
                            </div>

                        </div>
                        <div className='send__bar'>
                            <input
                                value={messege}
                                type='text'
                                placeholder='Type something...'
                                onChange={(e) => setMessege(e.target.value)} />
                                {/* <InputTranslate roomId={roomId} userLang={userLang} chats={chat} msg={messege}/> */}
                            <button onClick={sendChat}>{'>'}</button>
                        </div>
                    </>
                )

            }
        </div>
    )
}

export default Home;