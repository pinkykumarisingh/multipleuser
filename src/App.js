import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [userdata, setUserdata] = useState([]);
  const [show, setShow] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [show1, setShow1] = useState();
  const [srn, setSrn] = useState(0);
  const [edtSrn, setEdtSrn] = useState(0);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (srnumber) => {
    setSrn(srnumber);
    setShow1(true);
  };
  const [editshow, setEditShow] = useState();
  const edithandleClose = () => setEditShow(false);
  const edithandleShow = (indexs) => {

    setEdtSrn(indexs);
    for (let i = 0; i < userdata.length; i++) {
      if (i === indexs) {
        const userObje = userdata[indexs];

        setFirstName(userObje.firstName);
        setLastName(userObje.lastName);
        setUserName(userObje.userName);
        setEmail(userObje.email);
      }
    }

    setEditShow(true);
  };

  // const handleSave = () => setShow(true);

  /*  1. Need to write a function that will react data from html form 
    * 2.  Set that data in state 
  
     * 3. reset from 
     *4. Hide model 
  */

  const resetUserForm = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
  };

  const saveUserData = () => {
    const newUserData = userdata;
    // let userdata = localStorage.getItem("user");

    const uobj = datacheck(email, userName);
    if (uobj) {
      alert("You have entered duplicate email or username")
      return
    }

    /*  const mobj = datacheck(userName;
     if (mobj) {
       alert("You have entered duplicate userName")
       return
     } */

    newUserData.push({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
    });
    setUserdata(newUserData);
    resetUserForm();
    handleClose();
  };

  const deletUser = () => {
    const newUseList = [];
    for (let i = 0; i < userdata.length - 1; i++) {
      if (i < srn) {
        newUseList.push(userdata[i]);
      } else {
        newUseList.push(userdata[i + 1]);
      }
    }
    setUserdata(newUseList);
    handleClose1();
  };

  const editUser = () => {
    const temuserdata = userdata;
    for (let i = 0; i < userdata.length; i++) {
      if (i === edtSrn) {
        temuserdata[edtSrn].firstName = firstName;
        temuserdata[edtSrn].lastName = lastName;

        temuserdata[edtSrn].userName = userName;
        temuserdata[edtSrn].email = email;
      }
    }
    setUserdata(temuserdata);
    resetUserForm();
    // console.log("newUserList", newUserList);
    setEdtSrn(0);
    edithandleClose();
  };
  console.log("userdata", userdata);

  //   const newErrors = findFormErrors();
  //   const [error, setError] = useState("");
  //   if (Object.keys(newErrors).length > 0) {
  //     setError(newErrors);
  //   }
  // const findFormErrors = () => {
  //     const { email } = Form;
  //     const newErrors = {};

  //     if (!email || email === "") newErrors.email = "";
  //     else {
  //       alert("email already exit");
  //     }

  //     return newErrors;
  //   };


  //   return userdata.filter((item, 
  //     index) => userdata.indexOf(item) === index);
  // }



  const datacheck = (emaildata, userNamedata) => {
    let obj = userdata.find(o => o.email === emaildata);
    let mobj = userdata.find(o => o.userName === userNamedata);
    // debugger

    return obj || mobj

  }






  const userListWithElement = userdata.map((data, i) => {
    return (
      <tr>
        <td> {i + 1}</td>
        <td>{data?.firstName}</td>
        <td>{data?.lastName}</td>
        <td>{data?.userName}</td>
        <td>{data?.email}</td>
        <td>
          <Button variant="primary" onClick={() => handleShow1(i)}>
            Delete data
          </Button>
        </td>
        <td>
          {" "}
          <Button variant="primary" onClick={() => edithandleShow(i)}>
            Edit
          </Button>
        </td>
      </tr>
    );
  });

  console.log("message", message);

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{userListWithElement}</tbody>
      </Table>

      <div>
        <p>
          <Button variant="primary" onClick={handleShow}>
            Add user data modal
          </Button>
        </p>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>New user </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label> User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label> Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  if (regEx.test(email)) {
                    setMessage("email is valid");
                  } else if (!regEx.test(email) && email != "") {
                    setMessage("Email is not valid");
                  } else {
                    setMessage("");

                  }
                  setEmail(e.target.value)
                }
                }
              />
              <p>{message}</p>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUserData}>
            Save userdata
          </Button>
        </Modal.Footer>
      </Modal>
      {/* this is use delete modal */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title> Delete data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete Account</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => deletUser()}>
            Yes
          </Button>

          <Button variant="secondary" onClick={handleClose1}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* this is use edit modal */}

      <Modal show={editshow} onHide={edithandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Page</Modal.Title>
        </Modal.Header>

        <Form.Label> First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name "
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label> Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={editUser}>
            yes
          </Button>
          <Button variant="primary" onClick={edithandleClose}>
            no
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
