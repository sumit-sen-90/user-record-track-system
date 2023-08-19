import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "./Popup/DeleteConfirmationModal";

function Table() {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const data = useSelector((state) => state.userSlice.userInfo);

  useEffect(() => {
    setUsersData(data);
  }, [data]);

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(removeUser(userToDelete));
      setUserToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/user-form/${item.id}`}>
                    <button className="btn btn-primary btn-sm mx-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <DeleteConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </div>
  );
}

export default Table;
