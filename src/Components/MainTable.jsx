import React, { useState } from "react";
import { FaEdit, FaChevronDown, FaEllipsisV } from "react-icons/fa";
import projectsData from "./projects.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import AddProjectModal from "./AddProjectForm";


const ProjectTable = () => {
    const projectsREDUX = useSelector((state) => state.projects);
    let dispatch = useDispatch();

    console.log('projectsREDUX', projectsREDUX)
    const [showModal, setShowModal] = useState(false);

    // Toggle Expand/Collapse
    const toggleExpand = (id) => {
        let oldProject = projectsREDUX;
        oldProject?.map(ele => {
            if (ele.id == id) {
                ele.expanded = !ele.expanded;
                dispatch({type:"TOGGLE_PROJECT_EXPANDED",payload:{...oldProject}});

            }
        });
        console.log('oldProject :::::', oldProject);
    };

    // Active Tab Change
    const handleTabChange = (id, tab) => {
        dispatch({ type: "CHANGE_TAB", payload: { id, tab } });

    };

    return (
        <div className="container-fluid mt-3">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 className="fw-bold">Project</h4>
                <button
                    className="btn btn-primary px-4"
                    onClick={() => setShowModal(true)}
                >
                    Add
                </button>
            </div>
            <table className="table table-bordered mt-2">
                <thead className="bg-primary text-white">
                    <tr>
                        <th style={{ width: "8%" }} className="text-center">🔽</th>
                        <th>ID</th>
                        <th>Project Name</th>
                        <th>Project Start Date</th>
                        <th>Project End Date</th>
                        <th>Project Status</th>
                        <th>Project Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsREDUX.map((project) => (
                        <React.Fragment key={project.id}>
                            {/* Project Row */}
                            <tr>
                                <td className="text-center d-flex justify-content-center align-items-center gap-2">
                                    <FaChevronDown
                                        style={{ cursor: "pointer" }}
                                        onClick={() => toggleExpand(project.id)}
                                    />
                                    <FaEdit style={{ cursor: "pointer", color: "blue" }} />
                                    <FaEllipsisV style={{ cursor: "pointer" }} />
                                </td>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.start_date}</td>
                                <td>{project.end_date}</td>
                                <td>{project.status}</td>
                                <td>{project.stage}</td>
                            </tr>

                            {/* Show Details if Expanded */}
                            {project.expanded && (
                                <tr>
                                    <td colSpan="7">
                                        <div className="card">
                                            <div className="card-header d-flex justify-content-between">
                                                <div>
                                                    <button
                                                        className={`btn ${project.tabs.active_tab === "user_stories" ? "btn-primary" : "btn-outline-primary"} me-2`}
                                                        onClick={() => handleTabChange(project.id, "user_stories")}
                                                    >
                                                        User Stories
                                                    </button>
                                                    <button
                                                        className={`btn ${project.tabs.active_tab === "releases" ? "btn-primary" : "btn-outline-primary"}`}
                                                        onClick={() => handleTabChange(project.id, "releases")}
                                                    >
                                                        Releases
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                {project.tabs.active_tab === "user_stories" ? (
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>🔽</th>
                                                                <th>ID</th>
                                                                <th>Name</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {project.tabs.user_stories.length > 0 ? (
                                                                project.tabs.user_stories.map((story) => (
                                                                    <tr key={story.id}>
                                                                        <td style={{ width: "50px" }}>
                                                                            <FaEdit style={{ cursor: "pointer", color: "blue" }} />
                                                                            <FaEllipsisV style={{ cursor: "pointer" }} /></td>
                                                                        <td>{story.id}</td>
                                                                        <td>{story.name}</td>
                                                                        <td>{story.status}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="3" className="text-center text-danger">No User Stories</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>🔽</th>
                                                                <th>ID</th>
                                                                <th>Name</th>
                                                                <th>Release Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {project.tabs.releases.length > 0 ? (
                                                                project.tabs.releases.map((release) => (
                                                                    <tr key={release.id}>
                                                                        <td style={{ width: "50px" }}>
                                                                            <FaEdit style={{ cursor: "pointer", color: "blue" }} />
                                                                            <FaEllipsisV style={{ cursor: "pointer" }} /></td>
                                                                        <td>{release.id}</td>
                                                                        <td>{release.name}</td>
                                                                        <td>{release.date}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="3" className="text-center text-danger">No Releases</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <AddProjectModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default ProjectTable;
