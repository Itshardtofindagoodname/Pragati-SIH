"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandPointRight, FaUser } from 'react-icons/fa';
import { BsTranslate } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';

const Button = ({ children, className, onClick }) => (
  <motion.button
    className={`${className} transition-colors duration-300`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function RegisterLoginPage() {
  const [activeForm, setActiveForm] = useState('councillor');
  const [departmentLevel, setDepartmentLevel] = useState('');
  const [role, setRole] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  const stateDepartments = [
    "Public Works Department",
    "Urban Planning Department",
    "Environmental Department",
    "Water Supply Department",
    "Health Department",
    "Electricity Department"
  ];

  const localDepartments = [
    "Municipality",
    "Municipal Corporation",
    "Nagar Panchayat",
    "Gramin Panchayat"
  ];

  const handleDepartmentLevelChange = (e) => {
    setDepartmentLevel(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const filteredDepartments = departmentLevel === 'State' ? stateDepartments : departmentLevel === 'District' ? localDepartments : [];

  const handleSubmitDepartmental = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const response = await fetch('/api/departmental', {
        method: 'POST',
        body: JSON.stringify({
          "name": formData.get('fullName'),
          "pass": formData.get('password'),
          "email": formData.get('email'),
          "phone": formData.get('contactNumber'),
          "dept_level": formData.get('departmentLevel'),
          "role": formData.get('role'),
          "emp_no": formData.get('employeeNumber'),
          "location": formData.get('location'),
          "office_address": formData.get('address'),
          "pin_code": formData.get('pinCode'),
          "govt_issue_id_file_id": "234e5678-e89b-12d3-a456-426614174000",
          "authorisation_file_id": "345e6789-b21a-34c3-b123-567890abcdef",
          "prev_project_file_id": "456e7890-c32b-45d3-c234-678901234567",
          "verified": true
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userData', JSON.stringify({
          name: formData.get('fullName'),
          location: formData.get('location'),
          role: formData.get('role') === 'Technical' ? 'Technical Expert' : 'Officer'
        }));
        
        router.push(formData.get('role') === 'Technical' ? '/techexp' : '/officer');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRegistrationForm = () => {
    switch (activeForm) {
      case 'councillor':
        return (
          <motion.form
            className="space-y-4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <input type="text" placeholder="Full Name" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <input type="tel" placeholder="Contact No" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <div className="flex space-x-4">
              <input type="text" placeholder="Locality" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input type="text" placeholder="Municipality" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input type="text" placeholder="PIN Code" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <div className="flex gap-0">
              <label className="block text-sm font-medium text-gray-700">
                Upload Govt. Issued ID
              </label>
              <input type="file" accept="image/*" className="w-full p-2 border-2 border-[#516774] rounded pl-4" placeholder="Upload Govt Issued ID" />
            </div>
            <div className="flex space-x-4">
              <input type="password" placeholder="Password" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input type="password" placeholder="Confirm Password" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <Button className="w-full bg-[#FF5900] text-white py-3 rounded-full flex items-center justify-center hover:bg-[#FF7A33]">
              <FaUser className="mr-2" /> REGISTER AS COUNCILLOR
            </Button>
          </motion.form>
        );
      case 'contractor':
        return (
          <motion.form
            className="space-y-4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <input type="text" placeholder="Full Name" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <input type="tel" placeholder="Contact No" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <div className="flex space-x-4">
              <input type="text" placeholder="Locality" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input type="text" placeholder="PIN Code" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <div className='flex flex-row space-x-4'>
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Govt. Issued ID
                </label>
                <input type="file" accept="image/*" placeholder="Upload Govt Issued ID" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Contractor License
                </label>
                <input type="file" accept="image/*" placeholder="Upload Contractor License" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              </div>
            </div>
            <div className="flex space-x-4">
              <input type="password" placeholder="Password" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input type="password" placeholder="Confirm Password" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <Button className="w-full bg-[#FF5900] text-white py-3 rounded-full flex items-center justify-center hover:bg-[#FF7A33]">
              <FaUser className="mr-2" /> REGISTER AS CONTRACTOR
            </Button>
          </motion.form>
        );
      case 'departmental':
        return (
          <motion.form
            className="space-y-4 container overflow-y-scroll h-96 w-[400px] scrollbar-hide"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            onSubmit={async (e) => { e.preventDefault(); await handleSubmitDepartmental(e) }}
          >
            <input name="fullName" type="text" placeholder="Full Name" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <input name="email" type="email" placeholder="Email Address" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <div className="flex space-x-4">
              <input name="contactNumber" type="tel" placeholder="Contact Number" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input name="employeeNumber" type="text" placeholder="Employee Number" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <input name="location" type="text" placeholder="Location" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <div className="flex space-x-4">
              <input name="address" type="text" placeholder="Address" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
              <input name="pinCode" type="text" placeholder="PIN Code" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <div className="flex gap-0">
              <label className="block text-sm font-medium text-gray-700">Upload Govt. Issued ID</label>
              <input name="govtId" type="file" accept="image/*" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <div className="flex gap-0">
              <label className="block text-sm font-medium text-gray-700">Upload Departmental Authenticated Letter</label>
              <input name="deptAuthLetter" type="file" accept="image/*" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <div className="flex gap-0">
              <label className="block text-sm font-medium text-gray-700">Upload Previous Projects</label>
              <input name="previousProjects" type="file" accept="image/*" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            </div>
            <select
              name="departmentLevel"
              className="w-full p-2 border rounded"
              value={departmentLevel}
              onChange={handleDepartmentLevelChange}
            >
              <option value="">Select Department Level</option>
              <option value="State">State Department</option>
              <option value="District">Local Department</option>
            </select>
            <select name="department" className="w-full p-2 border rounded" disabled={!departmentLevel}>
              <option value="">Select Department</option>
              {filteredDepartments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              name="role"
              className="w-full p-2 border rounded"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="">Select Role</option>
              <option value="Technical">Technical Expert</option>
              <option value="Head">Officer/ Head of Department</option>
            </select>
            <input name="password" type="password" placeholder="Password" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-2 border-2 border-[#516774] rounded pl-4" />
            <div className="flex space-x-2">
              <Button className="w-full bg-[#FF5900] text-white py-3 rounded-full hover:bg-[#FF7A33] flex items-center justify-center" onSubmit={handleSubmitDepartmental}>
                <FaUser className="mr-2" /> REGISTER AS DEPARTMENTAL
              </Button>
            </div>
          </motion.form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-white p-2">
        <motion.nav
          className="container mx-auto px-4 flex justify-between h-20 items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-4xl font-bold text-[#516774]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            PRAGATI
          </motion.div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-10 mr-10">
              <Button className="flex flex-row items-center justify-center font-semibold">
                <BsTranslate className="mr-1" /> ENGLISH
              </Button>
            </div>
            <Button className="text-[#FF5900] border border-[#FF5900] px-4 py-2 rounded-full flex items-center hover:bg-[#FF5900] hover:text-white">
              <FaHandPointRight className="mr-2" /> COMPLAINT
            </Button>
          </div>
        </motion.nav>
      </header>

      <main className="container mx-auto mt-10 px-4 flex justify-center">
        <div className="w-full flex justify-between items-start">
          <motion.div
            className="w-1/2 px-10 flex flex-col items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#516774] mb-6">REGISTER</h2>
            <div className="flex space-x-2 mb-4">
              <Button
                className={`px-4 py-2 rounded-2xl ${activeForm === 'councillor' ? 'bg-[#FDE8DD] text-[#516774]' : 'bg-white text-[#516774] border border-[#516774]'}`}
                onClick={() => setActiveForm('councillor')}
              >
                Councillor
              </Button>
              <Button
                className={`px-4 py-2 rounded-2xl ${activeForm === 'contractor' ? 'bg-[#FDE8DD] text-[#516774]' : 'bg-white text-[#516774] border border-[#516774]'}`}
                onClick={() => setActiveForm('contractor')}
              >
                Contractor
              </Button>
              <Button
                className={`px-4 py-2 rounded-2xl ${activeForm === 'departmental' ? 'bg-[#FDE8DD] text-[#516774]' : 'bg-white text-[#516774] border border-[#516774]'}`}
                onClick={() => { setActiveForm('departmental') }}
              >
                Departmental
              </Button>
            </div>
            <motion.div
              className="w-[60%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {renderRegistrationForm()}
            </motion.div>
          </motion.div>
          <motion.div
            className="w-1/2 px-10 flex flex-col items-center border-l-2 border-dashed border-[#516774]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#516774] text-white p-10 rounded-3xl mb-4 w-2/4">
              <p className='text-xl mb-4'>Note:</p>
              <p className='text-md mb-4'>You can only "Log In" after the approval by your department.</p>
              <p className='text-md'>Use your Login ID to continue</p>
            </div>
            <h2 className="text-4xl font-bold text-[#516774] mb-6">LOG IN</h2>
            <motion.form
              className="space-y-4 w-2/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <input type="text" placeholder="Login ID" className='w-full p-2 border-2 border-[#516774] rounded pl-4' />
              <input type="password" placeholder="Password" className='w-full p-2 border-2 border-[#516774] rounded pl-4' />
              <Button className="w-full bg-[#FF5900] text-white py-3 rounded-full hover:bg-[#FF7A33]">
                SECURE LOGIN
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </main>
      {isloading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="w-16 h-16 border-t-4 border-[#FF5900] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
