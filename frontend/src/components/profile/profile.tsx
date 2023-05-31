import { useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";

import axios from "axios";
import { AppBar } from "../home/Navbar/AppBar";

export const Profile = () => {
  let auth: any = useAuthUser();
  let signOut = useSignOut();
  const [nickname, setNickname] = useState(auth().nickname);
  const [email, setEmail] = useState(auth().email);
  const [date, setDate] = useState(auth().date);
  const [gender, setGender] = useState(auth().gender);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (newPassword === "") {
      alert("new password empty");
    }
    if (oldPassword === "") {
      alert("old password empty");
    }
    if (passwordRepeat === "") {
      alert("password repeat empty");
    }
    const user = await axios.put("http://localhost:3000/user/putUser", {
      id: auth().id,
      nickname: nickname,
      email: email,

      password: passwordRepeat,
      hash: auth().hash,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    if (user.data.message === "password not match hash") {
      setMessage("Old Password Wrong");
    } else {
      setMessage("Succces Updated");
      signOut();
    }
  };

  return (
    <>
      <AppBar />
      <div className="container rounded bg-white mt-2">
        <div className="row">
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Takma İsim</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="takma isim"
                    value="rade"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value="rade@gmail.com"
                    placeholder="email"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Biyografi</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="biyografi"
                    value="yazılımcı"
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3 border-left">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span className="font-weight-bold">Umut Yılmaz</span>
              <span className="text-black-50">umut@gmail.com</span>
              <div className="col-md-10 mt-2">
                <textarea
                  style={{ width: 200, height: 100 }}
                  className="form-control"
                  value=""
                  placeholder="notlar"
                ></textarea>
              </div>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
