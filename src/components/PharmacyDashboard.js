import React, { useEffect, useState } from 'react';
import { getPendingRefills, getInventory } from '../services/pharmacyService';
import AppLayout from './AppLayout';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const PharmacyDashboard = () => {
  const [pendingRefills, setPendingRefills] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [filterText, setFilterText] = useState(''); // State for filtering

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const refillsData = await getPendingRefills();
          const inventoryData = await getInventory();
          setPendingRefills(refillsData);
          setInventory(inventoryData);
        } catch (error) {
          toast.error('Failed to fetch data. Please check your network connection.');
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("User not authenticated.");
        toast.error("Please log in to view your dashboard.");
      }
    };

    fetchData();
  }, []);

  const filteredRefills = pendingRefills.filter((refill) => {
    // Filter based on filterText (e.g., patient name, medication name)
    const searchText = filterText.toLowerCase();
    return (
      refill.patientName.toLowerCase().includes(searchText) ||
      refill.medicationName.toLowerCase().includes(searchText)
    );
  });

  return (
    <AppLayout userType="pharmacy">
      <div className="space-y-6">
        <h2>Pending Prescription Refills</h2>
        <input
          type="text"
          placeholder="Search by Patient Name or Medication"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4"
        />
        <ul className="space-y-3 text-center">
          {filteredRefills.map((refill, index) => (
            <li key={index}>
              {refill.patientName} - {refill.medicationName} (Quantity: {refill.quantity})
            </li>
          ))}
        </ul>

        <h2>Inventory</h2>
        <ul className="space-y-3 text-center">
          {inventory.map((item, index) => (
            <li key={index}>
              {item.medicationName} (Stock: {item.quantity})
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export default PharmacyDashboard;