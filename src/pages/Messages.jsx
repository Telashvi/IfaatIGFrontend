import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MessageContainer } from '../cmps/MessageContainer.jsx'
import { Chat } from '../pages/Chat.jsx'
import { messageService } from '../services/message.service.js'
import { gotNewMessage } from '../store/message.actions.js'


export function Messages() {
    const [chatMap, setChatMap] = useState({})
    const [currChat, setCurrChat] = useState({})
    const loggedInUser = useSelector(storeState => storeState.userModule.watchedUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const navigate = useNavigate()

    gotNewMessage(false)

    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const params = useParams()
    const chatWithId = params.id

    console.log(currChat)


    // useEffect(() => {
    //   console.log(params.id)
    // }, [params])


    useEffect(() => {
        const fetchChats = async () => {
            try {
                let chats = await messageService.getAvailableChats()
                chats = chats.reduce((acc, value) => {
                    const chatWith = (value.byUser.username === loggedInUser.username) ? value.toUser : value.byUser
                    acc[chatWith.username] = {
                        username: chatWith.username,
                        imgUrl: chatWith.imgUrl,
                        txt: value.txt,
                        lastSentMessage: value.createdAt,
                        withUserId: chatWith._id
                    }
                    return acc
                }, {})
                setChatMap(chats)
            } catch (err) {
                console.log(err)
            }
        }
        fetchChats()
    }, [])

    const onAddMessage = newMessage => {
        const chatMapCopy = structuredClone(chatMap)
        chatMapCopy[newMessage.toUser].txt = newMessage.txt
        setChatMap(chatMapCopy)
    }

    function goToUserChat(user) {
        // setCurrChat(user)
        navigate(`${user.withUserId}`)
    }

    function goTo(username) {
        setSearchModal(false)
        setFull(true)
        navigate(username)
    }



    return <div className="messages-page ">

        <div className="message-container ">

            <section className="message-users">
                <header>
                    <span>{user.username}<span className='arrow'><i className="fa-solid fa-chevron-down"></i></span></span>
                    <a><svg aria-label="New message" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg></a>
                </header>
                <header className='mini-header'>
                    <span>Messages</span>
                    <a>Request (1)</a>
                </header>

                {/* <div className="users-container flex column" > */}


                <div className="users">
                    {users.map(user =>
                        // <Link to={user.username} className="user-container">
                        <div key={user._id} onClick={() => goTo(user.username)} className="user-container flex ">
                            <div className="user-info flex">
                                <img src={user.imgUrl} />
                                <section>
                                    <span className="username">{user.username}</span>
                                    <div className="time">
                                        <span>Active<time> 29 </time>minuts ago</span>
                                    </div>
                                </section>
                            </div>
                        </div>)}

                </div>



                {/* {!!Object.keys(chatMap).length && Object.keys(chatMap).map(chatWith => {
                        return <div className="user-info" key={chatWith} onClick={() => goToUserChat(chatMap[chatWith])}> */}

                {/* return <div className="user-info" key={chatWith} onClick={() => setCurrChat(chatMap[chatWith])}> */}
                {/*  return <Link className="user-info" key={chatWith} to={`/inbox/${chatMap[chatWith].withUserId}`}> */}

                {/* <img src={chatMap[chatWith].imgUrl} />
                            <section>
                                <span className="username">{chatMap[chatWith].username}</span>
                                <div className="message"><span>{chatMap[chatWith].txt}</span><span className="time">•</span><span className="time">Just now</span></div>
                            </section>
                        </div>
                        //  </Link>
                    })} */}

                {/* <section className=""> */}
                {/* <section className="story-header flex column"> */}


                {/* <div className="user-info">
                        <img src="src\assets\imgs\chatsImg\noah-silliman-gzhyKEo_cbU-unsplash.jpg" /> */}


                {/* <Link to={story.by.username} className="story-user-name link">{story.by.username}</Link> */}

                {/* <div className="time">
                            <span>Active<time> 12 </time>minuts ago</span>

                        </div>
                    </div>
                    <div className="user-info">
                        <img src="src\assets\imgs\chatsImg\matheus-ferrero-pg_WCHWSdT8-unsplash.jpg" />

                        <div className="time">
                            <span>Active<time> 29 </time>minuts ago</span>
                        </div>
                    </div>
                    <div className="user-info flex">
                        <img src="src\assets\imgs\chatsImg\karl-magnuson-85J99sGggnw-unsplash.jpg" />

                        <div className="time">
                            <span>Active<time> 38 </time>minuts ago</span>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src="src\assets\imgs\chatsImg\craig-mckay-jmURdhtm7Ng-unsplash.jpg" />

                        <div className="time">
                            <span>Active<time> 4 </time>minuts ago</span>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src="src\assets\imgs\chatsImg\christopher-campbell-rDEOVtE7vOs-unsplash.jpg" />


                        <div className="time">
                            <span>Active<time> 18 </time>minuts ago</span>
                        </div>
                    </div> */}
                {/* <button onClick={() => setIsListOpen(!isListOpen)}
                            ><i className="fa-solid fa-ellipsis"></i> {isListOpen &&
                                <ActionListModal
                                    onRemoveStory={onRemoveStory}
                                    story={story}
                                    isListOpen={isListOpen}
                                    setIsListOpen={setIsListOpen}
                                />}
                            </button> */}
                {/* </section> */}
                {/* </section> */}

                {/* </div> */}

            </section>
            {
                Object.keys(currChat).length === 0 && !chatWithId ?
                    <div className="messanger-empty-container">
                        <div>
                            <svg aria-label="Direct" className="_ab6-" color="#262626" fill="#262626" height="96" role="img" viewBox="0 0 96 96" width="96"><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line><polygon fill="none" points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                            <span className='logo-text'>Your Messages</span>
                            <span className='logo-some-text'>Send private messages to a friend or group.</span>
                            <button>Send Message</button>
                        </div>
                    </div>
                    :
                    <MessageContainer chatWithId={chatWithId} currChat={currChat} onAddMessage={onAddMessage} />
                // <MessangerContainer currChat={currChat} onAddMessage={onAddMessage} />
            }

        </div >

    </div >
}