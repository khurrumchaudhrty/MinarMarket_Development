import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const ListingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics'
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newFiles = files.map(file => ({
        name: file.name,
        status: 'uploaded'
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploading(false);
    }, 1000);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    console.log('Uploaded Files:', uploadedFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <nav className="flex space-x-4">
              <a href="#" className="font-medium text-gray-900">Home</a>
              <a href="#" className="text-gray-500">Profile</a>
            </nav>
          </div>
          <button className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50">
            Log out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Product Form Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <h1 className="text-xl font-medium">List Your Product</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Product Description (Max. 200 words)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Upload Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag & drop files or <span className="text-blue-500">Browse</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPG, PNG
                  </p>
                </label>
              </div>

              {/* Uploaded Files List */}
              <div className="mt-4 space-y-2">
                {uploading && (
                  <div className="text-sm text-gray-600">
                    Uploading - 0% files
                  </div>
                )}
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white border rounded-md p-2"
                  >
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Submit for Approval
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="w-full h-px bg-gray-200 my-6"></div>

      <div className="mt-4 mb-4 flex justify-center items-center space-x-6 text-sm text-gray-500">
      <a href="#" className="hover:text-gray-700">Help Center</a>
      <a href="#" className="hover:text-gray-700">Terms of Service</a>
      <a href="#" className="hover:text-gray-700">Privacy Policy</a>
      </div>
    </div>
  );
};

export default ListingForm;