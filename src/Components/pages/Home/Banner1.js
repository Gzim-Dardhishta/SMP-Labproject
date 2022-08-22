import React, { useState } from 'react'
import './styles/banner1.scss';
import { CgClose } from 'react-icons/cg'

const Banner1 = () => {

    const [popup, setPopup] = useState(false);
    const showPopup = () => {
        setPopup(!popup);
    }

    const closePopup = () => {
        setPopup(false)
    }

    return (
        <div className='banner1'>
            <div className="bg-image">
                <div className="description-text">
                    <p>Managing system for requesting holidays</p>

                    {popup ? <div className="backdrop" onClick={closePopup}></div> : null }

                    <button className='show-popup' onClick={showPopup} type='button'>Learn More</button>

                    {popup ?
                        <div className="card">
                            <div className="close-button" onClick={closePopup}><CgClose /></div>
                            <p>To request Holidays you need to Log In as a User and then send a message to your manager</p>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner1