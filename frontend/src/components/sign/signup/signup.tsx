import { useRef } from "react";
import {useNavigate } from 'react-router-dom'
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Signup = () => {
  let navigate = useNavigate(); 
  const nickname: any = useRef(null);
  const email: any = useRef(null);
  const password: any = useRef(null);
  const passwordRepeat: any = useRef(null);
  const submit = async (e: any) => {
    if (nickname.current.value === "") {
      alert("nickname empty");
    }
    if (email.current.value === "") {
      alert("email empty");
    }
    if (password.current.value === "") {
      alert("password empty");
    }
    if (passwordRepeat.current.value === "") {
      alert("password repeat empty");
    }
    const user = await axios.post("http://80.253.246.129:3000/user/postUser", {
      nickname: nickname.current.value,
      email: email.current.value,
     
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
          <Form.Label>Kullanıcı Adı</Form.Label>
          <Form.Control ref={nickname} type="text" placeholder="Kullanıcı adı" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Email" />
        </Form.Group>
      
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Şifre</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Şifre" />
          <Form.Text className="text-muted">
          şifre en az 8 karakter en az bir büyük harf a
            küçük harf sayı içermelidir.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Şifre Tekrar</Form.Label>
          <Form.Control
            ref={passwordRepeat}
            type="password"
            placeholder="Şifre Tekrar"
          />
          <Form.Text className="text-muted">
          şifre en az 8 karakter en az bir büyük harf a
            küçük harf sayı içermelidir.
          </Form.Text>
        </Form.Group>
        <Button onClick={submit} variant="primary" type="button" style={{backgroundColor:'#1D9BF0',border:'0'}} >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
