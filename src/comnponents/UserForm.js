import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addUser, updateUser } from "../store/slices/userSlice";
import Header from "./Header";
import styles from "./UserForm.module.css";

function UserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isNotUpdateMode = !id;
  const usersData = useSelector((state) => state.userSlice.userInfo);
  const userToUpdate =
    !isNotUpdateMode && usersData.find((user) => user.id === Number(id));

  const initialValues = {
    name: userToUpdate ? userToUpdate.name : "",
    email: userToUpdate ? userToUpdate.email : "",
    gender: userToUpdate ? userToUpdate.gender : "",
    status: userToUpdate ? userToUpdate.status : "active",
  };

  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    gender: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    if (isNotUpdateMode || id) {
      const action = isNotUpdateMode
        ? addUser(values)
        : updateUser({ id: Number(id), updatedUserData: values });
      dispatch(action);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Header />
      <div className={`container mt-4 ${styles.user_form_container}`}>
        <h2> {isNotUpdateMode ? "Create User" : "Update User"}</h2>
        <Formik
          key={key}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form_container}>
            <div className="form-group justify mb-3">
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group mb-3">
              <label>Status:</label>
              <Field as="select" name="status" className="form-control">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group mb-3">
              <label>Gender:</label>
              {/* <div> */}
              <label className="mr-3">
                <Field type="radio" name="gender" value="male" /> Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" /> Female
              </label>
              {/* </div> */}
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {isNotUpdateMode ? "Create User" : "Update User"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default UserForm;
