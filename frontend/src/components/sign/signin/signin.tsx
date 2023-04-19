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
    if (email.current.value === "") {
      alert("email empty");
    }
    if (password.current.value === "password empty") {
      alert("password empty");
    }
    const user = await axios.post("http://localhost:3000/user/sign", {
      email: email.current.value,
      password: password.current.value,
    });
    if (user.data === "users not fount") {
      setMessage("user not found");
    } else if (user.data === "password not match hash") {
      setMessage("password or email wrong");
    } else {
     
      const userInfo = await axios.get("http://localhost:3000/user/getUserId", {
        headers: {
          "x-access-token": user.data as any,
        },
      });

      if (
        signIn({
          token: user.data as any,
          tokenType: "Bearer",
          authState: {
            id:userInfo.data?.user?.user[0][0],
            email: userInfo.data?.user?.user[0][2],
            nickname: userInfo.data?.user?.user[0][1],
            date: userInfo.data?.user?.user[0][3],
            gender: userInfo.data?.user?.user[0][4],
            hash: userInfo.data?.user?.user[0][5],
          },
          expiresIn: 120,
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
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>

        <Button onClick={submit} variant="primary" type="button">
          Sign In
        </Button>
      </Form>
    </div>
  );
};
