// src/components/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getPatientPrescriptions, getAssignedDoctor } from '../services/patientService';
import AppLayout from './AppLayout';
import { auth, firestore } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { getDoc, doc } from 'firebase/firestore';

const PatientDashboard = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [assignedDoctor, setAssignedDoctor] = useState(null);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user && user.email) {
        setPatientName(user.displayName || user.email);

        try {
          const prescriptionsData = await getPatientPrescriptions(user.email);
          setPrescriptions(prescriptionsData);

          const patientDocRef = doc(firestore, 'users', user.uid);
          const patientSnapshot = await getDoc(patientDocRef);

          if (patientSnapshot.exists() && patientSnapshot.data().doctorId) {
            const doctorId = patientSnapshot.data().doctorId;
            const doctorData = await getAssignedDoctor(doctorId);
            setAssignedDoctor(doctorData);
          } else {
            console.log("Doctor ID not found in patient record.");
          }
        } catch (error) {
          toast.error('Failed to fetch data. Please check your network connection.');
          console.error("Error fetching data:", error);
        }
      } else {
        toast.error("Please log in to view your dashboard.");
      }
    };

    fetchData();
  }, []);

  return (
    <AppLayout userType="patient" userName={patientName}>
      <Tabs>
        <TabList>
          <Tab>My Prescriptions</Tab>
          <Tab>Assigned Doctor</Tab>
        </TabList>

        <TabPanel>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {prescriptions.length > 0 ? (
                prescriptions.map((prescription, index) => (
                  <img
                    key={index}
                    src={prescription}
                    alt={`Prescription ${index + 1}`}
                    className="w-32 h-32 rounded shadow"
                  />
                ))
              ) : (
                <p>No prescriptions found.</p>
              )}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="space-y-6">
            {assignedDoctor ? (
              <div className="text-center justify-center">
                <p><strong>Name:</strong> {assignedDoctor.displayName || assignedDoctor.email}</p>
                <p><strong>Email:</strong> {assignedDoctor.email}</p>
              </div>
            ) : (
              <p>No assigned doctor found.</p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </AppLayout>
  );
};

export default PatientDashboard;
