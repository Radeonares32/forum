import { useEffect, useRef, useState } from 'react'
import './chat.css'
import { io } from 'socket.io-client'
import axios from 'axios'
import { AppBar } from '../home/Navbar/AppBar'


export const Chat = () => {
    const [message, setMessage] = useState<any>()
    const [messages, setMessages] = useState<any>([])
    const [user, setUser] = useState<any>()
    const socket = io('ws://localhost:3000', {
        autoConnect: true
    })
    const messageRef = useRef<any>()
    socket.on('connection', (io) => {
        window.alert('bağlandı')
    })
    const messageHandle = () => {
        
        socket.emit('message', { message: message })
        setMessage('')
    }
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
       

    }, [socket, message])
    useEffect(() => {
        axios.get('http://localhost:3000/user/getUser').then((users: any) => {
            setUser(users.data.user)
        })
    }, [])

    return (
        <>
            <AppBar />
            <div className="container mt-4">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <div id="plist" className="people-list">

                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                    {user && user.map((us: any, key: any) => (
                                        <li className="clearfix" key={key}>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                            <div className="about">
                                                <div className="name">{us[0].nickname}</div>
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                            <div className="chat" style={{overflowY:'scroll'}}>

                                <div className="chat-history" style={{overflowY:'scroll'}}>
                                    <ul className="m-b-0 overflow-auto" style={{overflowY:'scroll'}}>
                                        {messages && messages.map((mess: any, key: any) => (
                                            <li className="clearfix " id='messages' key={key}>
                                                <div className="message my-message"> {mess.message} </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                        </div>
                        <div className="chat-message clearfix">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text p-2"><i onClick={messageHandle} className="fa fa-send " style={{ height: '25px' }}></i></span>
                                </div>
                                <input type='text' onChange={(e: any) => setMessage(e.target.value)} value={message} className="form-control" placeholder='mesaj...' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}