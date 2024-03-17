import React, { useState, useEffect } from 'react'
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import LocIcon from '../../Images/loc.png'
import bot from '../../Images/chatbot.png'
import doc from '../../Images/document.png'
import mic from '../../Images/send-message.png'
import mic2 from '../../Images/microphone.png'
import "../CSS/style.css"

const LocMap = () => {



    const style = {
        section: {
            position: "absolute",
            top: "60px",
            left: '120px',
            width: "400px",
            height: "570px",
            overflow: "hidden",
            zIndex: "1",
            display: "none",


        },
        section2: {

            position: "absolute",
            width: "80px",
            display: "block",
            alineItem: "center",
            height: "300px",
            backgroundColor: "",
            bottom: "25px",
            left: "20px",
            zIndex: "1",
            alignItems: "center"

        },
        section3: {
            padding: "5px",
            borderRadius: "20%",
        },
        section4: {
            marginBottom: "12px"

        }


    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `AIzaSyBrAJXUQ_Z-q2l3X-yhLNvOfVB0KS7bqSU`
    })

    const markers = [
        {
            id: 1,
            name: "eheliaygoda",
            position: { lat: 6.7056, lng: 80.3847 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        },
        {
            id: 2,
            name: "sivali",
            position: { lat: 6.8486, lng: 80.2600 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb",
        },
        {
            id: 3,
            name: "kuruwita",
            position: { lat: 6.8218, lng: 80.3615 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        },
        {
            id: 4,
            name: "homagama",
            position: { lat: 6.8433, lng: 80.0032 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        },
        {
            id: 5,
            name: "horana",
            position: { lat: 6.7230, lng: 80.0647 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        },
        {
            id: 6,
            name: "Nivithigala",
            position: { lat: 6.5959, lng: 80.4578 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        },
        {
            id: 7,
            name: "Hatton",
            position: { lat: 6.9003, lng: 80.5966 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        },
        {
            id: 8,
            name: "Belihuloya",
            position: { lat: 6.7184, lng: 80.7741 },
            des: "This is a sample description Loradfdb dbfbddgbddvdagvdvfgrgbgfdgbfffbfbfffbfdbfggbsgbfbbfbgdfbdfgbdfb"
        }


    ]

    const displayOut = (id) => {
        if (id === actvemark) {
            return;
        }
        setactvemark(id);

    }

    const handledownload = () => {

    }


    const handleClick = () => {

        // var bot = document.getElementById('bot');

        var a = document.getElementById('boxBot')
        var b = document.getElementById('boxbotHead')

        if (a.style.display === "block") {
            // Close the bot
            a.style.display = "none";
            b.style.display = "none";
        } else {
            // Open the bot
            a.style.display = "block";
            b.style.display = "block";
        }

    }

    const [actvemark, setactvemark] = useState(null);


    //add chatbot

    const [inputInitHeight, setHeight] = useState('45')

    useEffect(() => {



        // const chatbotToggler = document.querySelector(".chatbot-toggler");
        // const closeBtn = document.querySelector(".close-btn");
        const chatbox = document.querySelector(".chatbox");
        const chatInput = document.querySelector(".chat-input textarea");
        const sendChatBtn = document.querySelector(".chat-input span");

        let userMessage = null; // Variable to store user's message
        const API_KEY = "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"; // Paste your API key here
        setHeight(chatInput.scrollHeight);

        const createChatLi = (message, className) => {
            // Create a chat <li> element with passed message and className
            const chatLi = document.createElement("li");
            chatLi.classList.add("chat", `${className}`);
            let chatContent = className === "outgoing" ? `<p></p>` : `<p></p>`;
            chatLi.innerHTML = chatContent;
            chatLi.querySelector("p").textContent = message;
            return chatLi; // return chat <li> element
        }

        const generateResponse = (chatElement) => {
            const API_URL = "https://api.openai.com/v1/chat/completions";
            const messageElement = chatElement.querySelector("p");

            // Define the properties and message for the API request
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userMessage }],
                })
            }

            // Send POST request to API, get response and set the reponse as paragraph text
            fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
                messageElement.textContent = data.choices[0].message.content.trim();
            }).catch(() => {
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
        }

        const handleChat = () => {
            userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
            if (!userMessage) return;

            // Clear the input textarea and set its height to default
            chatInput.value = "";
            chatInput.style.height = `${inputInitHeight}px`;

            // Append the user's message to the chatbox
            chatbox.appendChild(createChatLi(userMessage, "outgoing"));
            chatbox.scrollTo(0, chatbox.scrollHeight);

            setTimeout(() => {
                // Display "Thinking..." message while waiting for the response
                const incomingChatLi = createChatLi("Thinking...", "incoming");
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                generateResponse(incomingChatLi);
            }, 600);
        }

        chatInput.addEventListener("input", () => {
            // Adjust the height of the input textarea based on its content
            chatInput.style.height = `${inputInitHeight}px`;
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });

        chatInput.addEventListener("keydown", (e) => {
            // If Enter key is pressed without Shift key and the window 
            // width is greater than 800px, handle the chat
            if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
                e.preventDefault();
                handleChat();
            }
        });

        sendChatBtn.addEventListener("click", handleChat);
        // closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
        // chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));








    }, []);












    return (

        <div className=' w-[100%] h-[100vh] flex justify-center items-center'>
            {isLoaded ? <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100vh" }}
                center={
                    { lat: 6.8486, lng: 80.2600 }
                }
                zoom={10}


            >

                {markers.map(({ id, name, position, des }) => (
                    <MarkerF key={id} position={position} icon={{
                        url: `${LocIcon}`,
                        scaledSize: { width: 50, height: 50 },


                    }} onClick={() => displayOut(id)} >
                        {
                            actvemark === id ? <InfoWindowF onCloseClick={() => setactvemark(null)}>
                                <div style={{ backgroundColor: 'white', borderRadius: 'none' }}>


                                    <div class="card" style={{ width: "22rem" }}>

                                        <div class="card-body">
                                            <h1 className='bold'>{name}</h1>
                                            <p class="card-text fs-3 font-bold">{des}</p>
                                        </div>
                                    </div>

                                </div>

                            </InfoWindowF> : null
                        }
                    </MarkerF>
                ))

                }
            </GoogleMap> : null

            }




            {/* <iframe id='boxBot'
                    src="https://www.chatbase.co/chatbot-iframe/ZPDiUfqgdQ8IgqBz4c63i"
                    title="CAMPER"
                    width="100%"
                    style={{ width: "400px", height: "600px", position: "absolute", borderRadius: "12px", display: "none" }}

                    frameborder="0"
                ></iframe> */}



            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{backgroundColor:"#0b0b0b58"}}>
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header" style={{ backgroundColor: "#ffd54c", textAlign: "center", justifyContent:"space-between", display: "flex" }}>
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">ChatBot</h1>
                            <button type="button" class=" bg-black p-2 text-blue-500 rounded" data-bs-dismiss="modal" aria-label="Close" style={{color:"white"}}>Close</button>
                        </div>
                        <div class="modal-body bg-white">

                            <div className="box-wrp bg-white">

                                <div class="chatbot bg-white">


                                    <ul class="chatbox ">
                                        <li class="chat incoming">
                                            {/* <img src={ch} width="50" height="50" class="material-symbols-outlined" alt='' /> */}
                                            <p>Hi there 👋<br />How can I help you today?</p>
                                        </li>
                                    </ul>

                                    <div class="chat-input">
                                        <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
                                        <span id="send-btn" class="material-symbols-rounded" ><img src={mic} width="22" alt="" /></span>

                                    </div>
                                </div>
                            </div>




                        </div>

                    </div>
                </div>
            </div>










            <div className='' style={style.section2}>

                <button id='bot' type="button" class="btn " style={style.section3} className='shake mb-4 bg-amber-400 ' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                    <img src={bot} alt="" width={50} />
                </button>

                <a href={mic2} download >
                    <button onClick={handledownload} style={style.section3} className=' shake2  mb-6 bg-amber-400'><img src={doc} alt="" width={50} /></button>

                </a>

            </div>

        </div>
    )
}

export default LocMap