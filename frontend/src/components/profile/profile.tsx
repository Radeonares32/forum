import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useRef } from "react";
import {useAuthUser } from 'react-auth-kit'

import axios from "axios";
export const Profile = () => {
  let auth:any = useAuthUser()
  const nickname: any = useRef(null);
  const email: any = useRef(null);
  const date: any = useRef(null);
  const gender: any = useRef(null);
  const newPassword: any = useRef(null);
  const oldPassword: any = useRef(null);
  const passwordRepeat: any = useRef(null);

  const submit = async () =>{
    if(newPassword.current.value === "") {
        alert("new password empty")
    }
    if(oldPassword.current.value === "") {
        alert("old password empty")
    }
    if(passwordRepeat.current.value === "") {
        alert("password repeat empty")
    }
    const user = await axios.put('http://localhost:3000/user/putUser',{
        id:auth().id,
        nickname:nickname.current.value,
        email:email.current.value,
        gender:gender.current.value,
        date:date.current.value,
        password:passwordRepeat.current.value,
        hash:auth().hash,
        oldPassword:oldPassword.current.value,
        newPassword:newPassword.current.value
    })
    console.log(user.data)
  }

  return (
    <div className="col-md-5 mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nickname</Form.Label>
          <Form.Control ref={nickname} value={auth().nickname}  type="text" placeholder="Nickname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} value={auth().email} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="dob"  className="mb-3">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            value={auth().date}
            ref={date}
            type="date"
            name="dob"
            placeholder="Date of Birth"
          />
        </Form.Group>
        <Form.Group controlId="dob" className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select value={auth().gender} ref={gender} aria-label="Default select example">
            <option>Gender</option>
            <option value="male">Male</option>
            <option value="famale">Famale</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Old Password</Form.Label>
          <Form.Control ref={oldPassword} type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            password is at least 8 characters at least one capital letter a
            lowercase letter must contain numbers.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Password</Form.Label>
          <Form.Control ref={newPassword} type="password" placeholder="Password" />
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
          Update
        </Button>
      </Form>
    </div>
  );
};
