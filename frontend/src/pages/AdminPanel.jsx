import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Pencil, Trash2, X, Package } from 'lucide-react';

const API = `${import.meta.env.VITE_API_URL}/api/products`;
const emptyForm = {
  name: '', price: '', image: '', description: '', category: '', stock: '',
  bulkPrices: [
    { minQty: 1, maxQty: 9, price: '' },
    { minQty: 10, maxQty: 49, price: '' },
    { minQty: 50, maxQty: null, price: '' },
  ],
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, token, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { if (!user || !isAdmin) navigate('/'); }, [user, isAdmin]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      setProducts(await res.json());
    } catch { setError('Failed to load products'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBulkPrice = (index, field, value) => {
    const updated = [...form.bulkPrices];
    updated[index] = { ...updated[index], [field]: field === 'price' ? value : Number(value) };
    setForm({ ...form, bulkPrices: updated });
  };

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setError(''); setShowForm(true); };

  const openEdit = (p) => {
    setForm({ name: p.name, price: p.price, image: p.image, description: p.description,
      category: p.category, stock: p.stock,
      bulkPrices: p.bulkPrices?.length ? p.bulkPrices : emptyForm.bulkPrices });
    setEditingId(p._id); setError(''); setShowForm(true);
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.price || !form.image || !form.description || !form.category || form.stock === '') {
      setError('Please fill all required fields'); return;
    }
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock),
        bulkPrices: form.bulkPrices.map(t => ({ ...t, price: Number(t.price) })) };
      const res = await fetch(editingId ? `${API}/${editingId}` : API, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setShowForm(false); fetchProducts();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setDeleteId(null); fetchProducts();
    } catch { setError('Delete failed'); }
  };

  const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-amber-400 transition-all bg-stone-50 font-medium text-stone-800";
  const labelCls = "text-xs font-black text-stone-600 mb-1.5 block uppercase tracking-wider";

  return (
    <div className="min-h-screen font-sans" style={{ background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: "#F59E0B" }}>
              <Package className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-900">Admin Panel</h1>
              <p className="text-xs text-stone-400 font-medium">Manage your products</p>
            </div>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 text-stone-900 px-4 py-2 rounded-xl text-sm font-black hover:opacity-90 transition-all"
            style={{ background: "#F59E0B" }}>
            <Plus size={16} /> Add Product
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 font-medium">{error}</div>
        )}

        {/* Table */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="text-center py-16 text-stone-400 text-sm font-medium">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-sm font-medium">No products found</div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block">
                <table className="w-full text-sm">
                  <thead className="border-b border-stone-100" style={{ background: "#FAFAF8" }}>
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Actions'].map((h, i) => (
                        <th key={h} className={`px-5 py-3.5 text-xs font-black text-stone-500 uppercase tracking-wider ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-stone-100 flex-shrink-0" />
                            <span className="font-bold text-stone-800 line-clamp-1">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-xl">{p.category}</span>
                        </td>
                        <td className="px-5 py-3.5 font-black text-stone-900">Rs. {p.price?.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                            {p.stock} pcs
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => openEdit(p)} className="p-2 text-stone-500 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all border border-stone-200 hover:border-amber-300">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => setDeleteId(p._id)} className="p-2 text-stone-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all border border-stone-200 hover:border-red-200">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden divide-y divide-stone-100">
                {products.map((p) => (
                  <div key={p._id} className="flex items-center gap-3 px-4 py-3.5">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-stone-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-stone-900 truncate">{p.name}</p>
                      <p className="text-xs text-stone-400 font-medium">{p.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-stone-800">Rs. {p.price?.toLocaleString()}</span>
                        <span className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                          {p.stock} pcs
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => openEdit(p)} className="p-2 text-stone-500 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all border border-stone-200">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(p._id)} className="p-2 text-stone-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all border border-stone-200">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="text-base font-black text-stone-900">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-4 flex flex-col gap-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-3 py-2 font-medium">{error}</div>}

              {[
                { label: 'Product Name', name: 'name', placeholder: 'e.g. Matte Lipstick' },
                { label: 'Image URL', name: 'image', placeholder: 'https://images.unsplash.com/...' },
                { label: 'Description', name: 'description', placeholder: 'Short product description' },
                { label: 'Category', name: 'category', placeholder: 'e.g. Lips, Eyes, Face' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className={labelCls}>{label}</label>
                  <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className={inputCls} />
                </div>
              ))}

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelCls}>Base Price (Rs.)</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="1299" className={inputCls} />
                </div>
                <div className="flex-1">
                  <label className={labelCls}>Stock (pcs)</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="100" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Bulk Pricing</label>
                <div className="flex flex-col gap-2">
                  {form.bulkPrices.map((tier, i) => (
                    <div key={i} className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
                      <span className="text-xs font-bold text-stone-400 w-20 flex-shrink-0">
                        {tier.maxQty ? `${tier.minQty}–${tier.maxQty} pcs` : `${tier.minQty}+ pcs`}
                      </span>
                      <input type="number" value={tier.price} onChange={(e) => handleBulkPrice(i, 'price', e.target.value)}
                        placeholder="Price" className="flex-1 border border-stone-200 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-amber-400 bg-white font-medium text-stone-800" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-100 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-stone-200 text-stone-600 rounded-xl text-sm font-bold hover:bg-stone-50 transition-all">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={saving}
                className="flex-1 py-2.5 text-stone-900 rounded-xl text-sm font-black hover:opacity-90 transition-all disabled:opacity-60"
                style={{ background: "#F59E0B" }}>
                {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 border border-stone-200">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-2xl mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="text-base font-black text-stone-900 text-center mb-1">Delete Product?</h3>
            <p className="text-xs text-stone-400 text-center mb-6 font-medium">Ye action undo nahi ho sakta.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-stone-200 text-stone-600 rounded-xl text-sm font-bold hover:bg-stone-50 transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-black hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}