import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignOut, useAuthUser } from "react-auth-kit";

export const Update = () => {
  let navigate = useNavigate();
  const nickname: any = useRef(null);
  const email: any = useRef(null);
  const biyografi: any = useRef(null);
  const note: any = useRef(null);

  const auth: any = useAuthUser();
  const logout: any = useSignOut();

  const [postImage, setPostImage] = useState<any>();
  const submit = async (e: any) => {
    if (nickname.current.value === "") {
      alert("kullanıcı adi bos");
    }
    if (biyografi.current.value === "") {
      alert("biyografi adi bos");
    }
    if (note.current.value === "") {
      alert("note adi bos");
    }
    if (email.current.value === "") {
      alert("email bos");
    }
    if (!postImage) {
      alert("resim bos");
    }
    const formData = new FormData();
    formData.append("id", auth().id);
    formData.append("nickname", nickname.current.value);
    formData.append("image", postImage);
    formData.append("email", email.current.value);
    formData.append("bio", biyografi.current.value);
    formData.append("note", note.current.value);
    const user = await axios.put(
      "http://80.253.246.129:3000/user/putUser",
      formData,
      {
        headers: {
          "x-access-token": auth().token,
        },
      }
    );

    if (user.data.message.message == "Success update") {
      alert("profil güncellendi yeniden giriş yapın");
      logout();
      await axios.post(`http://80.253.246.129:3000/user/logout`, {},{
        headers: {
          "x-access-token": auth().token
        },
      })
      navigate("/");
    }
  };
  useEffect(() => {
    axios
      .get("http://80.253.246.129:3000/user/getUserId", {
        headers: {
          "x-access-token": auth().token,
        },
      })
      .then((user: any) => {
        email.current.value = user.data.user.user[0][0].properties.email;
        nickname.current.value = user.data.user.user[0][0].properties.nickname;
        biyografi.current.value = user.data.user.user[0][0].properties.bio;
        note.current.value = user.data.user.user[0][0].properties.note;
      });
  }, []);
  return (
    <div className="col-md-5 mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Resim</Form.Label>
          <Form.Control
            onChange={(e: any) => setPostImage(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Kullanıcı Adı</Form.Label>
          <Form.Control
            ref={nickname}
            type="text"
            placeholder="Kullanıcı adı"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Biyografi</Form.Label>
          <Form.Control ref={biyografi} type="text" placeholder="biyografi" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Not</Form.Label>
          <Form.Control ref={note} type="text" placeholder="note" />
        </Form.Group>
        <Button
          onClick={submit}
          variant="primary"
          type="button"
          style={{ backgroundColor: "#1D9BF0", border: "0" }}
        >
          Güncelle
        </Button>
      </Form>
    </div>
  );
};
