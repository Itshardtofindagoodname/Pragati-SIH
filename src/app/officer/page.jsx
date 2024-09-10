"use client";
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaFileAlt, FaUser, FaClock } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { motion } from 'framer-motion';
import { BsTranslate } from 'react-icons/bs';

const calculateStatus = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
    return "To be completed soon";
  } else if (diffDays > 30 && diffDays <= 180) {
    return "We're coming sooner than you expect";
  } else {
    return "This will take some time";
  }
};

const ProjectItem = ({ project }) => (
  <motion.div
    className="bg-gray-100 py-4 pl-12 rounded-lg mb-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="grid grid-cols-4 gap-6">
      <div>
        <div className="flex items-center mb-3">
          <FaFileAlt className="mr-3" size={22} />
          <span className="text-lg font-medium">{project.work_type}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-3" size={20} />
          <span>{project.locality}</span>
        </div>
      </div>
      <div>
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <FaClock className="mr-3" size={20} />
          <span>{calculateStatus(project.start_date, project.end_date)}</span>
        </div>
        <div className="text-sm flex items-center text-gray-600 mb-3">
          <SlCalender className="mr-3" size={20} />
          {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}
        </div>
      </div>
      <div>
        <div className="flex items-center mb-3">
          <FaUser className="mr-3" size={20} />
          <span className="text-sm">{project.department_level}</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          TRACK PROGRESS
        </button>
      </div>
    </div>
  </motion.div>
);

const Officer = () => {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [newTask, setNewTask] = useState({
    locality: '',
    work_type: '',
    department_level: '',
    start_date: '',
    end_date: '',
    head_ids: '',
    resources: '',
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        if (data.tasks) {
          setProjects(data.tasks.reverse());
        }
      })
      .catch(error => console.error('Error fetching tasks:', error));
  
    fetch('/api/complaint')
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setComplaints(data.data.reverse());
        }
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  const handleProposalModalToggle = () => setShowProposalModal(!showProposalModal);
  const handleComplaintModalToggle = () => setShowComplaintModal(!showComplaintModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          head_ids: newTask.head_ids.split(',').map(id => id.trim()),
          resources: newTask.resources.split(',').map(resource => resource.trim()),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProjects([...projects, data.task]); // Add the new task to the list
        handleProposalModalToggle(); // Close the proposal modal
      } else {
        console.error('Error adding task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <header className="flex justify-between items-center mb-20">
        <motion.div 
          className="text-4xl font-bold text-[#516774]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          PRAGATI
        </motion.div>
        <nav className="flex-grow flex justify-center">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-gray-800 text-lg">ABOUT</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800 text-lg">PRIVACY</a></li>
            <li><a href="#" className="flex items-center text-gray-600 hover:text-gray-800 text-lg">
              <BsTranslate className="mr-2" /> ENGLISH
            </a></li>
          </ul>
        </nav>
        <button 
          className="text-[#FF5900] border border-[#FF5900] px-4 py-2 rounded-full flex items-center hover:bg-[#FF5900] hover:text-white"
          onClick={handleComplaintModalToggle}
        >
          Complaints
        </button>
      </header>
      
      <div className="w-full px-10">
        <div className="mb-2 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold text-orange-500 mb-2">{userData?.name || 'Loading...'}</h2>
            <p className="text-2xl text-gray-600">{userData?.role || 'Officer'} | {userData?.location || 'Loading...'}</p>
            <h3 className="text-3xl font-bold text-orange-500 mt-8">Projects</h3>
          </div>
          <div className="text-3xl space-y-5 flex flex-col justify-center items-end">
            <p><span className="text-orange-500 font-bold">Ongoing Projects:</span> 05</p>
            <p><span className="text-orange-500 font-bold">Completed Projects:</span> 00</p>
          </div>
        </div>
        
        <div className="mb-6 flex justify-between">
          <div>
              <button className="bg-orange-200 text-orange-800 px-5 py-2 rounded-lg mr-2">Ongoing</button>
              <button className="bg-white text-gray-600 border border-gray-300 px-5 py-2 rounded-lg">Completed</button>
          </div>
          <button 
            className="bg-[#6C8894] text-white px-3 py-2 flex flex-row items-center rounded-lg hover:bg-[#D2F6F7] hover:text-black transition-colors"
            onClick={handleProposalModalToggle}
          >
              Raise a proposal
          </button>
        </div>
        
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))
        ) : (
          <p className="text-lg text-gray-600">No projects available.</p>
        )}
      </div>

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Raise a Proposal</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="locality"
              placeholder="Project Location"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.locality}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="work_type"
              placeholder="Work Type"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.work_type}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department_level"
              placeholder="Department Level"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.department_level}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="start_date"
              placeholder="Start Date"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.start_date}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="end_date"
              placeholder="End Date"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.end_date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="head_ids"
              placeholder="Head IDs (comma-separated)"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.head_ids}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="resources"
              placeholder="Resources (comma-separated)"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              value={newTask.resources}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={handleProposalModalToggle}
            >
              Cancel
            </button>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-80 overflow-scroll scrollbar-hide">
          <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Submitted Complaints</h2>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-2 font-semibold"
                  onClick={handleComplaintModalToggle}
                >
                  Close
                </button>
          </div>
            {complaints.length > 0 ? (
              <div className="space-y-4">
                {complaints.map((complaint, index) => (
                  <div key={index} className="border border-gray-300 p-3 rounded-lg">
                    <h3 className="text-lg font-semibold">{complaint.fullname}</h3>
                    <p className="text-sm text-gray-600">Email: {complaint.email}</p>
                    <p className="text-sm text-gray-600">Phone: {complaint.phone}</p>
                    <p className="text-sm text-gray-600">PIN: {complaint.pin}</p>
                    <p className="text-sm text-gray-600">Problem: {complaint.problem}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-gray-600">No complaints available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Officer;
