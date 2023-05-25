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
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right"></div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              {message ? (
                <div className="alert alert-danger">{message}</div>
              ) : (
                <div></div>
              )}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nickname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">old password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">old password repeat</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">new password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">bio</label>
                  <textarea className="form-control" ></textarea>
                </div>
                <div className="col-md-12">
                  <label className="labels">note</label>
                  <textarea className="form-control" ></textarea>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={submit}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
