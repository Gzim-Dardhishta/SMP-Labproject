import React from 'react'
import './styles/footer.scss'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="center">
                <div className="logo">
                    <h4>SMP</h4>
                </div>
                <div className="copyright">
                    <div className="c-icon">
                        <p>Copyright</p>
                        <AiOutlineCopyrightCircle />
                    </div>
                    <div className="year">
                        SMP 2022 All rights reserved.
                    </div>
                </div>
            </div>

            <div className="authors">
                <p className='dev'>Developers:</p>
                <div className="names">
                    <p>Gzim Dardhishtaa</p>
                </div>
            </div>
        </div>
    )
}

export default Footer