import React, { useEffect, useState } from "react";
import "../style.css";
import Loader from "./Loader";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getUsers,
  deleteUser,
  updateUser,
  clearErrors,
} from "../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Users = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [target, setTarget] = useState();

  const { loading, users, error } = useSelector((state) => state.users);
  const { isDeleted, isUpdated } = useSelector((state) => state.user);

  /* delete function variables */
  const [showDelete, setShowDelete] = useState(false);
  const DELETE_USER_RESET = "DELETE_USER_RESET";
  
  /* update function variables */
  const [showUpdate, setShowUpdate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const UPDATE_USER_RESET = "UPDATE_USER_RESET";

  const submitUpdate = async(e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert.error("Please input a value");
      dispatch(clearErrors());
      console.log(email, name);
    } else {
      target.name = name;
      target.email = email;
      target.__v++;
      console.log(target);
      await dispatch(updateUser(target));
      setEmail();
      setName();
      setTarget();
      setShowUpdate(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("User deleted succesfully...");
      dispatch({ type: DELETE_USER_RESET });
    }
    if (isUpdated) {
      alert.success("User updated succesfully...");
      dispatch({ type: UPDATE_USER_RESET });
    }
    dispatch(getUsers());
  }, [dispatch, alert, error, isDeleted, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container row d-flex justify-content-center align-center text-center">
            {users.map((data) => (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-2 m-2 border border-dark">
                <h5 className="mb-3 mx-auto ">{data.name}</h5>
                <h6 className="mb-3 mx-auto">{data.email}</h6>
                <h4 className="d-inline-block">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      setTarget(data);
                      setShowUpdate(true);
                    }}
                  >
                    <BsPencilSquare />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setTarget(data);
                      setShowDelete(true);
                    }}
                  >
                    <BsTrash />
                  </Button>
                </h4>
              </div>
            ))}
          </div>

          {
            /* for delete function and modal */

            showDelete && (
              <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete {`${target.name}`} ?</Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      await dispatch(deleteUser(target._id));
                      setTarget();
                      setShowDelete(false);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTarget();
                      setShowDelete(false);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )
          }

          {
            /* for update function and modal */

            showUpdate && (
              <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
                <Modal.Body>
                  <Form
                    id="formUpdateUser"
                    onSubmit={submitUpdate}
                    className="p-lg-5 p-1"
                  >
                    <Form.Label className="mb-4 h3">Update User</Form.Label>

                    <Form.Group className="w-100 p-1">
                      <Form.Group className="mt-1 h5">Name</Form.Group>
                      <Form.Control
                        type="text"
                        className="w-100 p-2 h6"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={target.name}
                      />
                    </Form.Group>

                    <Form.Group className="w-100 p-1">
                      <Form.Group className="mt-1 h5">Email</Form.Group>
                      <Form.Control
                        type="email"
                        className="w-100 p-2 h6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={target.email}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" form="formUpdateUser" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTarget();
                      setShowUpdate(false);
                      setEmail();
                      setName();
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )
          }
        </>
      )}
    </>
  );
};

export default Users;
