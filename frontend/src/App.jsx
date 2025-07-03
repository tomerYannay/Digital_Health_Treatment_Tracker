// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar.jsx';
import TreatmentForm from './components/TreatmentForm.jsx';
import TreatmentList from './components/TreatmentList.jsx';

function App() {
  // 1) server data
  const [treatments, setTreatments] = useState([]);
  // 2) form “draft” state persists across navigation
  const [draft, setDraft] = useState({
    patientName: '',
    type: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    fetchTreatments();
  }, []);

  // fetch all treatments from backend
  const fetchTreatments = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/treatments');
      setTreatments(data);
    } catch (err) {
      console.error('Error fetching treatments:', err);
      toast.error('Error fetching treatments');
    }
  };

  // add a new treatment, then clear the draft
  const handleAdd = async (treatment) => {
    try {
      await axios.post('http://localhost:5000/api/treatments', treatment);
      fetchTreatments();
      toast.success('Treatment added!');
      // clear draft on success
      setDraft({ patientName: '', type: '', date: '', notes: '' });
    } catch (err) {
      console.error('Error adding treatment:', err);
      const msg = err.response?.data?.error || 'Failed to add treatment';
      toast.error(msg);
    }
  };

  // delete and refetch
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/treatments/${id}`);
      fetchTreatments();
      toast.success('Treatment deleted');
    } catch (err) {
      console.error('Error deleting treatment:', err);
      toast.error('Failed to delete treatment');
    }
  };

  return (
    <>
      <Navbar />

      {/* Toast container (one per app) */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>
        <Route
          path="/add"
          element={
            <TreatmentForm
              form={draft}
              setForm={setDraft}
              onAdd={handleAdd}
            />
          }
        />
        <Route
          path="/list"
          element={
            <TreatmentList
              treatments={treatments}
              onDelete={handleDelete}
            />
          }
        />
        <Route path="*" element={<Navigate to="/add" replace />} />
      </Routes>
    </>
  );
}

export default App;
