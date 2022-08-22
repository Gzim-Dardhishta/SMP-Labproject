import React, { useState } from 'react';
import './styles/requestform.scss'
import email from '../../../assets/email.svg'
import person from '../../../assets/person.svg'

class RequestForm extends React.Component {

    // const [Email, setEmail] = useState('');

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }
        //Lastname
        if (!fields["lastname"]) {
            formIsValid = false;
            errors["lastname"] = "Cannot be empty";
        }

        if (typeof fields["lastname"] !== "undefined") {
            if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["lastname"] = "Only letters";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (!(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                fields["email"].indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                fields["email"].length - lastDotPos > 2
            )) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Message
        if (!fields["message"]) {
            formIsValid = false;
            errors["message"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            alert("Form submitted");
        } else {
            alert("Form has errors.");
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div className='request-form'>
                <div className="text">
                    <h4>Send your message to your manager here.</h4>
                </div>

                <div className="form">
                    <h4 className='form-title'>
                        Fill the brackets down below with your information
                    </h4>

                    <form action="" onSubmit={this.contactSubmit.bind(this)}>
                        <div className="name-input-container">
                            <div className="name">
                                <label htmlFor="">
                                    Name
                                </label>
                                <div className="inner-input-container">
                                    <span className="person-icon" style={{ content: `url(${person})` }}></span>
                                    <input
                                        type="name"
                                        name='name'
                                        placeholder='Enter your name'
                                        className='form-input'
                                        onChange={this.handleChange.bind(this, "name")}
                                        value={this.state.fields["name"]}
                                    />
                                </div>
                                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                            </div>
                            <div className="last-name">
                                <label htmlFor="">
                                    Last name
                                </label>
                                <div className="inner-input-container">
                                    <span className="person-icon" style={{ content: `url(${person})` }}></span>
                                    <input
                                        type="lastname"
                                        name='lastname'
                                        placeholder='Enter your last name'
                                        className='form-input'
                                        onChange={this.handleChange.bind(this, "lastname")}
                                        value={this.state.fields["lastname"]}
                                    />
                                </div>
                                <span style={{ color: "red" }}>{this.state.errors["lastname"]}</span>
                            </div>
                        </div>

                        <div className="email">
                            <div className="input-container">
                                <label htmlFor="">
                                    Email
                                </label>
                                <div className="inner-input-container">
                                    <span className="email-icon" style={{ content: `url(${email})` }}></span>
                                    <input
                                        type="email"
                                        name='email'
                                        // onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter your email'
                                        className='form-input'
                                        onChange={this.handleChange.bind(this, "email")}
                                        value={this.state.fields["email"]}
                                    />
                                </div>
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            </div>
                        </div>

                        <div className="message-box">
                            <input
                                type="message"
                                name="message" id="message"
                                placeholder='Type your message here'
                                onChange={this.handleChange.bind(this, "message")}
                                value={this.state.fields["message"]} 
                            />
                            <span style={{ color: "red" }}>{this.state.errors["message"]}</span>
                        </div>

                        <div className='button-container'>
                            <input type="submit" id='submit' value="Send Message" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RequestForm