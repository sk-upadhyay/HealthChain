//src/services/pharmacyService
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebaseConfig';

const db = getFirestore(firebaseApp);

// Fetch pending prescription refills
export const getPendingRefills = async () => {
  const refillsRef = collection(db, 'refills');
  const q = query(refillsRef, where('status', '==', 'pending'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Fetch pharmacy inventory
export const getInventory = async () => {
  const inventoryRef = collection(db, 'inventory');
  const querySnapshot = await getDocs(inventoryRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update refill status (Optional, if applicable)
export const updateRefillStatus = async (refillId, newStatus) => {
  const refillRef = doc(db, 'refills', refillId);
  await updateDoc(refillRef, { status: newStatus });
};

// (Optional) Add other pharmacy-related functions here
// For example, adding new medications to inventory, etc.