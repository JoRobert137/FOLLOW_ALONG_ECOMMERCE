import { useState, useEffect } from 'react';
import axios from 'axios';
import AddressList from '../components/AllAddress/Addresses';
import { Link } from 'react-router-dom';
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';

export default function SelectAddress() {
  const [AllAddresses, setAllAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return alert('Token missing, please login again');
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/user/get-addresses?token=${token}`
        );
        setAllAddresses(response.data.userInfo.address || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-[60vh] flex items-center justify-center"
        style={{ background: 'var(--surface)' }}
      >
        <div className="animate-spin w-10 h-10 rounded-full" style={{ border: '3px solid var(--border)', borderTopColor: 'var(--amber)' }} />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh]" style={{ background: 'var(--surface)' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Select Address
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Choose a delivery address
            </p>
          </div>
          <Link
            to="/add-address"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--gradient-amber)',
              color: 'var(--midnight)',
            }}
          >
            <FaPlus size={10} />
            Add New
          </Link>
        </div>

        <AddressList addresses={AllAddresses} />
      </div>
    </div>
  );
}