// src/services/patientService.js
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

/**
 * Fetch prescriptions for a specific patient, returning them in image format.
 * @param {string} patientId - The UID of the patient.
 * @returns {Promise<Array>} - An array of prescription image URLs.
 */
export const getPatientPrescriptions = async (patientId) => {
  try {
    const prescriptionsRef = collection(firestore, 'prescriptions');
    const q = query(prescriptionsRef, where('patientId', '==', patientId));
    const querySnapshot = await getDocs(q);

    const prescriptions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.imageUrl) {
        prescriptions.push(data.imageUrl); // Assumes prescription data includes an image URL
      }
    });

    return prescriptions;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
};

/**
 * Fetch the assigned doctor for a specific patient by doctorId (UID).
 * @param {string} doctorId - The UID of the doctor assigned to the patient.
 * @returns {Promise<Object|null>} - The doctor's profile, or null if not found.
 */
export const getAssignedDoctor = async (doctorId) => {
  try {
    const doctorRef = doc(firestore, 'users', doctorId);
    const doctorSnapshot = await getDoc(doctorRef);

    if (doctorSnapshot.exists()) {
      return { id: doctorSnapshot.id, ...doctorSnapshot.data() };
    } else {
      console.log("No such doctor found.");
      return null;
    }
  } catch (error) {
    console.error('Error fetching assigned doctor:', error);
    throw error;
  }
};
