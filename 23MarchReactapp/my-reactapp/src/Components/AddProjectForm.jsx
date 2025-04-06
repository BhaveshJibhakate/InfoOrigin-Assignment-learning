import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddProjectModal = ({ show, onClose }) => {
     const dispatch=useDispatch()
  const [newProject, setNewProject] = useState({
    id: undefined,
    name: "",
    start_date: "",
    end_date: "",
    status: "",
    stage: "",
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProject(newProject);
    onClose(); // Modal close after adding project
  };

  const handleAddProject = (newProject) => {
    dispatch({
        type: "ADD_PROJECT",
        payload: {
         ...newProject
        },
      });
  };
  
  if (!show) return null; 

  return (
    <div className="modal fade show d-block w-100" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Project</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input type="number" name="id" placeholder="ID" className="form-control mb-2" onChange={handleChange} required />
              <input type="text" name="name" placeholder="Project Name" className="form-control mb-2" onChange={handleChange} required />
              <input type="date" name="start_date" placeholder="Project Start date" className="form-control mb-2" onChange={handleChange} required />
              <input type="date" name="end_date" placeholder="Project End date" className="form-control mb-2" onChange={handleChange} required />
              <input type="text" name="status" placeholder="Status" className="form-control mb-2" onChange={handleChange} required />
              <input type="text" name="stage" placeholder="Stage" className="form-control mb-2" onChange={handleChange} required />
              <button type="submit" className="btn btn-primary w-100">Add Project</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
