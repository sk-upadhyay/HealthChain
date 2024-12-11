// src/services/doctorService.js
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebaseConfig';

const db = getFirestore(firebaseApp);

// Fetch patients assigned to a specific doctor by doctor email
export const getPatientsForDoctor = async (doctorEmail) => {
  const patientsRef = collection(db, 'patients');
  const q = query(patientsRef, where('doctorEmail', '==', doctorEmail));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Upload prescription image URL for a specific patient
export const uploadPrescriptionForPatient = async (patientId, prescriptionUrl) => {
  const patientRef = doc(db, 'patients', patientId);
  await updateDoc(patientRef, { prescriptionUrl });
};
