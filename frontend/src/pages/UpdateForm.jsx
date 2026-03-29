import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCloudUploadAlt, FaEdit } from 'react-icons/fa';

function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    discountedPrice: '',
    originalPrice: '',
    quantity: '',
    category: '',
  });
  const [errorInput, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [Images, setImages] = useState(null);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const getDataForId = async () => {
      try {
        const singleData = await axios.get(
          `http://localhost:8080/product/get-single/${id}`
        );
        const d = singleData.data.data;
        setFormData({
          title: d.title || '',
          description: d.description || '',
          rating: d.rating || '',
          discountedPrice: d.discountedPrice || '',
          originalPrice: d.originalPrice || '',
          quantity: d.quantity || '',
          category: d.category || '',
        });
        if (d.images) setPreviews(d.images);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    getDataForId();
  }, [id]);

  const handleImageUpload = (e) => {
    const ImagesArray = Array.from(e.target.files);
    setImages(ImagesArray);
    setPreviews(ImagesArray.map((f) => URL.createObjectURL(f)));
  };

  const handleChange = (e) => {
    setInputError('');
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, discountedPrice, originalPrice, quantity, category } = formData;
    if (!title || !description || !discountedPrice || !originalPrice || !quantity || !category) {
      return setInputError('Please fill in all required fields');
    }

    setLoading(true);
    const formDataBody = new FormData();
    Object.entries(formData).forEach(([key, val]) => formDataBody.append(key, val));
    if (Images) {
      Images.forEach((ele) => formDataBody.append('files', ele));
    }

    try {
      await axios.put(
        `http://localhost:8080/product/update-products/${id}`,
        formDataBody,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      navigate('/');
    } catch (er) {
      setInputError(er.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'var(--surface)',
    border: '1.5px solid var(--border)',
    color: 'var(--text-primary)',
  };

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" style={{ background: 'var(--surface)' }}>
        <div className="animate-spin w-10 h-10 rounded-full" style={{ border: '3px solid var(--border)', borderTopColor: 'var(--amber)' }} />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12" style={{ background: 'var(--surface)' }}>
      <div className="w-full max-w-2xl animate-fade-in-up" style={{ background: 'var(--card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Header */}
        <div className="px-8 pt-8 pb-5 flex items-center gap-3" style={{ background: 'var(--gradient-midnight)' }}>
          <div className="p-2.5 rounded-xl" style={{ background: 'var(--amber-glow)' }}>
            <FaEdit size={18} style={{ color: 'var(--amber)' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-inverse)' }}>Update Product</h2>
            <p className="text-xs" style={{ color: 'var(--slate-light)' }}>Edit product details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-4">
          {errorInput && (
            <div className="px-4 py-3 rounded-lg text-sm font-medium animate-fade-in" style={{ background: 'var(--error-light)', color: 'var(--error)' }}>
              {errorInput}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Product Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              rows="3" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none resize-none" style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Original Price (₹)</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Discounted Price (₹)</label>
              <input type="number" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Stock</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Rating</label>
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--amber)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>Product Images</label>
            <label htmlFor="update-images"
              className="flex flex-col items-center justify-center py-6 rounded-xl cursor-pointer transition-all duration-200"
              style={{ ...inputStyle, borderStyle: 'dashed' }}>
              <FaCloudUploadAlt size={24} style={{ color: 'var(--amber)' }} />
              <span className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                {Images ? `${Images.length} new file(s)` : 'Click to replace images'}
              </span>
            </label>
            <input type="file" id="update-images" multiple onChange={handleImageUpload} className="hidden" accept="image/*" />
            {previews.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 mt-2"
            style={{ background: 'var(--gradient-amber)', color: 'var(--midnight)', boxShadow: 'var(--shadow-amber)' }}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;