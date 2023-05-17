import { useRef } from "react";
import {useNavigate } from 'react-router-dom'
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Signup = () => {
  let navigate = useNavigate(); 
  const nickname: any = useRef(null);
  const email: any = useRef(null);
  const date: any = useRef(null);
  const gender: any = useRef(null);
  const password: any = useRef(null);
  const passwordRepeat: any = useRef(null);
  const submit = async (e: any) => {
    if (nickname.current.value === "") {
      alert("nickname empty");
    }
    if (email.current.value === "") {
      alert("email empty");
    }
    if (date.current.value === "") {
      alert("date empty");
    }
    if (gender.current.value === "") {
      alert("gender empty");
    }
    if (password.current.value === "") {
      alert("password empty");
    }
    if (passwordRepeat.current.value === "") {
      alert("password repeat empty");
    }
    const user = await axios.post("http://localhost:3000/user/postUser", {
      nickname: nickname.current.value,
      email: email.current.value,
      gender: gender.current.value,
      date: date.current.value,
      password: password.current.value,
      passwordRepeat: passwordRepeat.current.value,
    });
    if(user.data?.message === "Success created") {
      return navigate('/signin')
    }
  };
  return (
    <div className="col-md-5 mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nickname</Form.Label>
          <Form.Control ref={nickname} type="text" placeholder="Nickname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="dob" className="mb-3">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            ref={date}
            type="date"
            name="dob"
            placeholder="Date of Birth"
          />
        </Form.Group>
        <Form.Group controlId="dob" className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select ref={gender} aria-label="Default select example">
            <option>Gender</option>
            <option value="male">Male</option>
            <option value="famale">Famale</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            password is at least 8 characters at least one capital letter a
            lowercase letter must contain numbers.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password Repeat</Form.Label>
          <Form.Control
            ref={passwordRepeat}
            type="password"
            placeholder="Password repeat"
          />
          <Form.Text className="text-muted">
            password is at least 8 characters at least one capital letter a
            lowercase letter must contain numbers.
          </Form.Text>
        </Form.Group>
        <Button onClick={submit} variant="primary" type="button">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
