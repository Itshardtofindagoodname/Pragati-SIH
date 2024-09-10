"use client";
import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapPin, FaExclamationTriangle, FaPaperclip } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ComplaintItem = ({ complaint }) => (
  <motion.div
    className="bg-gray-100 py-4 pl-12 rounded-lg mb-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="grid grid-cols-4 gap-6">
      <div>
        <div className="flex items-center mb-3">
          <FaExclamationTriangle className="mr-3" size={22} />
          <span className="text-lg font-medium">{complaint.problem}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaMapPin className="mr-3" size={20} />
          <span>{complaint.pin}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaPhone className="mr-3" size={20} />
          <span>{complaint.phone}</span>
        </div>
        <div className="text-sm flex items-center text-gray-600 mb-3">
          <FaEnvelope className="mr-3" size={20} />
          <span>{complaint.email}</span>
        </div>
      </div>
      <div className="flex items-center mb-3">
        <FaPaperclip className="mr-3" size={20} />
        <span className="text-sm">Attachment ID: {complaint.attachment_id}</span>
      </div>
    </div>
  </motion.div>
);

const ComplainModal = () => {
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    fullname: '',
    email: '',
    phone: '',
    pin: '',
    problem: '',
    attachment_id: ''
  });

  useEffect(() => {
    fetch('/api/complaint')
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          setComplaints(data.data);
        }
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  const handleModalToggle = () => setShowModal(!showModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint({ ...newComplaint, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComplaint),
      });

      if (response.ok) {
        const data = await response.json();
        setComplaints([...complaints, data]); // Add the new complaint to the list
        handleModalToggle(); // Close the modal
      } else {
        console.error('Error adding complaint');
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
          COMPLAINTS
        </motion.div>
      </header>
      
      <div className="w-full px-10">
        <div className="mb-2 flex flex-row justify-between items-center">
          <h3 className="text-3xl font-bold text-orange-500">Complaints</h3>
          <button 
            className="bg-[#6C8894] text-white px-3 py-2 flex flex-row items-center rounded-lg hover:bg-[#D2F6F7] hover:text-black transition-colors"
            onClick={handleModalToggle}
          >
              Raise a Complaint
          </button>
        </div>
        
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <ComplaintItem key={index} complaint={complaint} />
          ))
        ) : (
          <p className="text-lg text-gray-600">No complaints available.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Raise a Complaint</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="pin"
                placeholder="Pin Code"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
              />
              <textarea
                name="problem"
                placeholder="Describe the problem"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="attachment_id"
                placeholder="Attachment ID"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600"
                onClick={handleModalToggle}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplainModal;
