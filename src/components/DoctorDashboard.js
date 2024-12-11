// src/components/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import { getPatientsForDoctor, uploadPrescriptionForPatient } from '../services/doctorService';
import { auth } from '../firebaseConfig';
import AppLayout from './AppLayout';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    const fetchDoctorData = async () => {
      const user = auth.currentUser;
      if (user) {
        setDoctorName(user.displayName || user.email);
        try {
          const patientsList = await getPatientsForDoctor(user.email);
          setPatients(patientsList);
        } catch (error) {
          toast.error('Error fetching patients');
        }
      }
    };
    fetchDoctorData();
  }, []);

  const handleCheckPrescription = (prescriptionUrl) => {
    if (prescriptionUrl) {
      window.open(prescriptionUrl, '_blank');
    } else {
      toast.info('No prescription uploaded for this patient.');
    }
  };

  const handleUploadPrescription = async (patientId) => {
    const prescriptionUrl = prompt('Enter the prescription image URL:');
    if (prescriptionUrl) {
      try {
        await uploadPrescriptionForPatient(patientId, prescriptionUrl);
        toast.success('Prescription uploaded successfully!');
        setPatients((prev) =>
          prev.map((patient) =>
            patient.id === patientId ? { ...patient, prescriptionUrl } : patient
          )
        );
      } catch (error) {
        toast.error('Failed to upload prescription.');
      }
    }
  };

  return (
    <AppLayout userType="doctor" userName={doctorName}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">Your Patients</h2>
        <ul className="space-y-3">
          {patients.map((patient) => (
            <li key={patient.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-lg">{patient.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCheckPrescription(patient.prescriptionUrl)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Check Prescription
                </button>
                <button
                  onClick={() => handleUploadPrescription(patient.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Upload Prescription
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export default DoctorDashboard;
