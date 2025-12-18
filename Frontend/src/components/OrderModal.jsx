import React from "react";

const OrderModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Place Order</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                  placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                  placeholder="9860811063"
              />
            </div>

            <div>
                <label className="block text-sm mb-1">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                  placeholder="Enter your full address"
                  rows="3"
              />
            </div>

            <div>
                <label className="block text-sm mb-2">Payment Method</label>
                <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                  />
                  <span className="text-sm">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleChange}
                  />
                  <span className="text-sm">Online Payment</span>
                </label>
              </div>
            </div>
          </div>

            <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;

