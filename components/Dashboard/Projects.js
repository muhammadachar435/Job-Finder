"use client";
import { useEffect, useRef, useState } from "react";
import Model from "../UIModel/Model";
import Activity from "./Activity";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function AddProject() {
  const initialization = { projectname: "", Status: "Pending", Progress: "", Team: "" };
  const [formData, setFormData] = useState(initialization);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState([]);
  const [threeDots, setThreeDots] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const useref = useRef(null);
  const { projectname, Status, Progress, Team } = formData;

  // Model OPen background Scroll Off
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isModalOpen]);

  // UseEffect by GET Data

  useEffect(() => {
    GetData(); // Immediately call Data Once

    const interval = setInterval(() => {
      GetData();
    }, 2000);

    const clearTime = setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    // Clean up function
    return () => {
      clearInterval(interval);
      clearTimeout(clearTime);
    };
  }, [formData]);

  // Data Change Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Three Dots
  function handleThreeDots() {
    setThreeDots(true);
  }

  // Create Project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectname, Status, Progress, Team }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      console.log("Project created:", data);

      // Reset form and close modal
      setFormData(initialization);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  // Get Data
  async function GetData() {
    const projectData = await fetch("api/project", {
      method: "GET",
    });
    if (projectData.status === 500) {
      alert("Something went Wrong");
      return;
    }
    const data = await projectData.json();
    if (!data.error) {
      console.log("Prjt Data", data);
      setProject(data.data);
    }
  }

  // UseEffect to close three dots menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (useref.current && !useref.current.contains(event.target)) {
        setThreeDots(false);
      }
    }

    if (threeDots) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [threeDots]);

  // handle DOt function
  // eslint-disable-next-line no-redeclare
  function handleThreeDots(id) {
    setMenuOpenId(menuOpenId === id ? null : id);
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      const data = await res.json();
      console.log(data.message);

      // Remove deleted project from state
      setProject((prev) => prev.filter((prj) => prj._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting project");
    }
  }

  // Update Method

  function updatePrjt(prj) {
    setSelectedProject({
      _id: prj._id,
      projectname: prj.projectname || "",
      Status: prj.Status || "Pending",
      Progress: prj.Progress || "",
      Team: prj.Team || "",
    });
    setIsUpdateOpen(true);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { _id, ...updateData } = selectedProject;
    try {
      const res = await fetch(`/api/project/${_id}`, {
        // use selectedProject._id
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData), // send updated project object
      });

      if (!res.ok) throw new Error(res.status);

      const data = await res.json();

      // Update UI instantly
      setProject((prev) => prev.map((p) => (p._id === selectedProject._id ? data.data : p)));

      setIsUpdateOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error updating project");
    }
  }

  return (
    <>
      <div className="small:mt-4 tablet:mt-8 desktop:flex desktop:justify-between desktop:mr-2">
        {/* Project Model */}
        <div
          className={`${
            project.length > 4 ? "overflow-y-scroll" : "tablet:overflow-hidden"
          }  w-full small:max-w-[280px] large:max-w-[300px] tablet:max-w-[650px] desktop:max-w-[550px] mac:max-w-[720px] overflow-x-scroll tablet:overflow-x-hidden bg-white border rounded-2xl border-slate-300 mb-10 small:mx-auto desktop:ml-0 shadow-lg h-full max-h-[420px]  pb-12`}
        >
          <div className="flex justify-between items-center my-4 mx-2">
            <p className="font-inter text-lg font-semibold">Active Projects</p>{" "}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Project
            </button>
          </div>
          <table className="w-full relative">
            <thead className="border-b border-slate-300 bg-gray-200">
              <tr>
                <th className="p-2 uppercase font-medium">Project</th>
                <th className="p-2 uppercase font-medium">Status</th>
                <th className="p-2 uppercase font-medium">Progress</th>
                <th className="p-2 uppercase font-medium">Team</th>
                <th className="p-2 uppercase font-medium"></th>{" "}
              </tr>
            </thead>
            <tbody className="">
              {project.map((prj, index) => {
                return (
                  <tr
                    key={prj._id}
                    className={`${
                      index === project.length - 1 ? "border-none" : "border-b border-slate-300"
                    }   bg-white`}
                  >
                    <td className="text-center small:p-2 tablet:p-3 mac:p-6 font-inter  w-full tablet:w-[110px] mac:max-w-35 ">
                      {prj.projectname}
                    </td>
                    <td className="text-center  font-inter w-full tablet:w-[105px] mac:max-w-35 ">
                      <span
                        className={`${
                          prj.Status === "Pending"
                            ? "text-yellow-600 bg-amber-200 ring ring-yellow-500"
                            : prj.Status === "InProgress"
                            ? "text-blue-500 bg-blue-200 ring ring-blue-500"
                            : prj.Status === "Completed"
                            ? "text-green-500  bg-green-200 ring ring-green-500"
                            : prj.Status === "Cancelled"
                            ? "text-red-600 bg-red-200 ring ring-red-500"
                            : prj.Status === "NotStarted"
                            ? "text-purple-500 bg-purple-200 ring ring-purple-500"
                            : prj.Status === "Hold"
                            ? "text-yellow-600 ring border-yellow-500 bg-yellow-100"
                            : ""
                        } p-1 rounded-md font-inter`}
                      >
                        {prj.Status}
                      </span>
                    </td>

                    <td className="text-center p-2 font-inter w-full tablet:w-[105px] mac:max-w-35">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mx-auto ">
                        <div
                          className="bg-blue-400 rounded-full h-3 transition-all duration-500 "
                          style={{ width: `${prj.Progress}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="text-center p-2 font-inter w-full small:w-[105px] mac:max-w-[200px]">
                      <span className="bg-blue-500 text-white p-2 rounded-full">
                        {prj.Team.slice(0, 3)}
                      </span>
                    </td>

                    <td className="border-none p-2 font-inter w-full tablet:w-[50px] border mac:max-w-10 cursor-pointer">
                      <BsThreeDotsVertical
                        className="mx-auto"
                        onClick={() => {
                          handleThreeDots(prj._id);
                          setThreeDots(true);
                        }}
                      />
                      {menuOpenId === prj._id && threeDots && (
                        <div
                          ref={useref}
                          className="grid grid-cols-1 gap-y-2 absolute right-2 z-10  rounded-md bg-white p-2 shadow-lg"
                        >
                          <button
                            onClick={() => updatePrjt(prj)}
                            className="text-base bg-green-400 text-white font-inter p-1 font-semibold cursor-pointer rounded-md active:bg-green-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(prj._id)}
                            className="text-base bg-red-400 text-white font-inter p-1 font-semibold cursor-pointer active:bg-red-600  rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Activity */}
        <div>
          <Activity />
        </div>
      </div>
      {/* End Activity & Project Detail*/}

      {/* Model opens only when needed PUT METHOD */}
      {isModalOpen && (
        <Model closeup={() => setIsModalOpen(false)}>
          <div className="mx-auto my-4">
            <h2 className="small:text-lg tablet:text-xl desktop:text-2xl font-inter  font-semibold mb-4 text-center">
              Create New Project
            </h2>
            <Image
              src="/addProject.png"
              width={100}
              height={100}
              priority
              alt="AddProject"
              className="mx-auto my-4"
            />
            <form onSubmit={handleSubmit}>
              <div className="grid small:grid-cols-1 small:gap-6 tablet:grid-cols-2 my-4 place-items-center mx-auto">
                <input
                  type="text"
                  name="projectname"
                  placeholder="Project Name"
                  value={formData.projectname}
                  onChange={handleChange}
                  className={`${
                    formData.projectname === "" ? "text-gray-400" : "text- text-black"
                  } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter`}
                  required
                />

                <select
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className={`${
                    formData.Status === "" ? "text-gray-400" : "text- text-black"
                  } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter`}
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                  <option value="Hold">Hold</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="NotStarted">NotStarted</option>
                </select>

                <input
                  type="number"
                  name="Progress"
                  placeholder="Progress (0-100)"
                  value={formData.Progress}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  className={`${
                    formData.Progress === "" ? "text-gray-400" : "text- text-black"
                  } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter`}
                />

                <input
                  type="text"
                  name="Team"
                  placeholder="Team Name"
                  value={formData.Team}
                  onChange={handleChange}
                  className={`${
                    formData.Team === "" ? "text-gray-400" : "text- text-black"
                  } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter`}
                  required
                />
              </div>
              {/* Button Start */}

              <div className="w-full flex justify-center gap-3 mt-8">
                <button
                  type="submit"
                  className="bg-green-500 text-white  px-4 py-2 cursor-pointer rounded hover:bg-green-600 transition"
                >
                  Add Project
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white  px-4 py-2 cursor-pointer rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
              {/* button end */}
            </form>
          </div>
        </Model>
      )}

      {/* Update Model */}

      {isUpdateOpen && (
        <Model closeup={() => setIsUpdateOpen(false)}>
          <div className="mx-auto my-4">
            <h2 className="small:text-lg tablet:text-xl desktop:text-2xl font-inter  font-semibold mb-4 text-center">
              Update Project
            </h2>
            <Image
              src="/updateprj.png"
              width={100}
              height={100}
              priority
              alt="AddProject"
              className="mx-auto my-4 hidden tablet:flex"
            />

            <form
              onSubmit={handleUpdate}
              className="grid small:grid-cols-1 tablet:grid-cols-2 tablet:gap-y-5"
            >
              <div>
                <label className="text-lg font-inter font-medium mx-1">Project Name</label>
                <br />
                <input
                  type="text"
                  name="projectname"
                  value={selectedProject.projectname}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, projectname: e.target.value })
                  }
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter mt-1"
                />
              </div>
              <div>
                <label className="text-lg font-inter font-medium mx-1">Status</label>
                <select
                  name="Status"
                  value={selectedProject.Status}
                  onChange={(e) => setSelectedProject({ ...selectedProject, Status: e.target.value })}
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] h-[41px] font-inter mt-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                  <option value="Hold">Hold</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="NotStarted">NotStarted</option>
                </select>
              </div>

              <div>
                <label className="text-lg font-inter font-medium mx-1">Progress</label>
                <input
                  type="number"
                  name="Progress"
                  value={selectedProject.Progress}
                  onChange={(e) => setSelectedProject({ ...selectedProject, Progress: e.target.value })}
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter mt-[2px]"
                />
              </div>
              <div>
                <label className="text-lg font-inter font-medium mx-1">Team Name</label>
                <input
                  type="text"
                  name="Team"
                  value={selectedProject.Team}
                  onChange={(e) => setSelectedProject({ ...selectedProject, Team: e.target.value })}
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-[280px] font-inter  mt-[2px]"
                />
              </div>

              <div className="grid place-items-center tablet:w-[500px] tablet:justify-items-end gap-y-2 mt-4 tablet:grid-cols-2 m-2 ">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 w-35 h-10 cursor-pointer rounded hover:bg-green-600 transition"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 w-35 h-10 cursor-pointer rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Model>
      )}
    </>
  );
}
