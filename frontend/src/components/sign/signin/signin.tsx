import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Signin = () => {
  const isAuth = useIsAuthenticated();
  useEffect(() => {
    if (isAuth()) {
      navigate("/");
    }
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const email: any = useRef(null);
  const password: any = useRef(null);
  const signIn = useSignIn();

  const submit = async () => {
    /* if (email.current.value === "") {
      alert("email empty");
    } */
    /* if (password.current.value === "password empty") {
      alert("password empty");
    } */
    const user = await axios.post("http://80.253.246.129:3000/user/sign", {
      email: email.current.value,
      password: password.current.value,
    });
    console.log(user.data)
    if (user.data === "users email not found" ||user.data === "user username not found") {
      setMessage("böyle bir kullanıcı yok");
    } else if (user.data === "password not match hash") {
      setMessage("şifre yanlış");
    } else {
      const userInfo = await axios.get("http://80.253.246.129:3000/user/getUserId", {
        headers: {
          "x-access-token": user.data.token.token as any,
        },
      });
     
      if (
        signIn({
          token: user.data.token.token as any,
          tokenType: "Bearer",
          authState: {
            id: userInfo.data.user.user[0][0].properties.id,
            email: userInfo.data.user.user[0][0].properties.email,
            nickname:userInfo.data.user.user[0][0].properties.nickname,
            token: user.data.token.token as any,
          },
          expiresIn: user.data.token.exp as any,
        })
      ) {
        navigate("/");
      }
    }
  };
  return (
    <div className="col-md-5 mt-5">
      {message ? (
        <div className="alert alert-danger">{message}</div>
      ) : (
        <div></div>
      )}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Kullanıcı adı veya email</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Kullanıcı adı veya email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Şifre</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Şifre" />
        </Form.Group>

        <Button onClick={submit} variant="primary" type="button" style={{backgroundColor:'#1D9BF0',border:'0'}}>
          Giriş Yap
        </Button>
      </Form>
    </div>
  );
};
