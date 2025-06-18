import React, { useState, useEffect } from 'react';
import './buy.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'; // Import FaTimes for close icon
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Buy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Receive either a single product or cart items from location state
  // Destructure quantity and totalAmount specifically for the single product case
  const { product, cartItems: itemsFromCart, totalAmount: totalFromCart, quantity: singleProductQuantity, totalAmount: singleProductTotalAmount } = location.state || {};


  // State to hold items being purchased (either single product or cart items)
  const [itemsToPurchase, setItemsToPurchase] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  // All addresses from localStorage
  const [addresses, setAddresses] = useState([]);
  // Selected address id
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  // Form for add/edit address
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDeleteId, setAddressToDeleteId] = useState(null);


  // Load addresses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('addresses');
    if (saved) {
      const addrList = JSON.parse(saved);
      setAddresses(addrList);
      if (addrList.length > 0) {
        setSelectedAddressId(addrList[0].id);
      }
    }
  }, []);

  // Save addresses to localStorage whenever addresses change
  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  // Determine items and total based on location state (single product or cart items)
  useEffect(() => {
    if (itemsFromCart && Array.isArray(itemsFromCart) && itemsFromCart.length > 0) {
      // Coming from CartPage with multiple items
      setItemsToPurchase(itemsFromCart);
      setTotalAmount(parseFloat(totalFromCart || 0));
    } else if (product) {
      // Coming from ProductDetailPage with a single product
      // Structure the single product to match the backend's expected cart item format
      const singleItemForOrder = {
        product_name: product.name,
        image_url: product.image_url, // Assuming image_url is available
        quantity: singleProductQuantity || 1, // Use the passed quantity, default to 1
        price: parseFloat(product.price || 0) // Still store the price per item here
      };
       if (!singleItemForOrder.product_name || !singleItemForOrder.image_url || singleItemForOrder.quantity === undefined || singleItemForOrder.price === undefined) {
           console.error("Incomplete product data received:", product);
           alert("Product information is incomplete. Cannot proceed.");
           setItemsToPurchase([]);
           setTotalAmount(0);
           return;
      }
      setItemsToPurchase([singleItemForOrder]);
      // Use the passed totalAmount for the overall total
      setTotalAmount(parseFloat(singleProductTotalAmount || singleItemForOrder.price)); // Use the passed totalAmount, default to single item price if not passed
    } else {
        // No product or cart items received
        console.error("No product or cart items received in Buy page state.");
        alert("No items to purchase. Please go back and select items.");
        setItemsToPurchase([]);
        setTotalAmount(0);
        // Optionally navigate back
        // navigate(-1);
    }
  }, [location.state]); // Depend on location.state


  // Validate form fields
  const validate = () => {
    const err = {};
    if (!formData.name) err.name = 'Name is required';
    if (!formData.phone) err.phone = 'Phone is required';
    if (!formData.address) err.address = 'Address is required';
    if (!formData.pincode) err.pincode = 'Pincode is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Open popup for new address or edit existing
  const openAddEditPopup = (address = null) => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({ id: null, name: '', phone: '', address: '', pincode: '' });
    }
    setErrors({});
    setShowPopup(true);
  };

  // Save new or edited address
  const handleSaveAddress = () => {
    if (!validate()) return;

    if (formData.id) {
      // Edit existing
      setAddresses(addresses.map(addr => (addr.id === formData.id ? formData : addr)));
    } else {
      // Add new
      const newAddress = { ...formData, id: Date.now().toString() };
      setAddresses([...addresses, newAddress]);
      setSelectedAddressId(newAddress.id);
    }
    setShowPopup(false);
  };

  // Function to show the delete confirmation modal
  const confirmDeleteAddress = (id) => {
    setAddressToDeleteId(id);
    setShowDeleteModal(true);
  };

  // Function to handle the confirmed deletion
  const handleDeleteAddressConfirmed = () => {
    if (addressToDeleteId) {
      const filtered = addresses.filter(addr => addr.id !== addressToDeleteId);
      setAddresses(filtered);
      if (selectedAddressId === addressToDeleteId && filtered.length > 0) {
        setSelectedAddressId(filtered[0].id);
      } else if (filtered.length === 0) {
        setSelectedAddressId(null);
      }
      setAddressToDeleteId(null); // Clear the ID
      setShowDeleteModal(false); // Hide the modal
    }
  };

  // Function to close the delete modal
  const handleCloseDeleteModal = () => {
    setAddressToDeleteId(null); // Clear the ID
    setShowDeleteModal(false);
  };


  // Continue to payment
  const handleContinue = () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address.');
      return;
    }
     if (itemsToPurchase.length === 0 || totalAmount <= 0) { // Added check for totalAmount
        alert('No items to purchase or total amount is zero.');
        return;
    }
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    // Pass the itemsToPurchase array, selected address, AND totalAmount to the Payment page
    navigate('/payment', { state: { cartItems: itemsToPurchase, address: selectedAddress, totalAmount: totalAmount } });
  };

  return (
    <div className="buy-page">
      <h2 className="checkout-title">Secure checkout</h2>

      <div className="checkout-container">
        <div className="checkout-left">
          <section className="address-section">
            <h3>Select delivery address</h3>
            {addresses.length === 0 ? (
              <button className="add-address-btn" onClick={() => openAddEditPopup()}>
                Add a new delivery address
              </button>
            ) : (
              <>
                <ul className="address-list">
                  {addresses.map(addr => (
                    <li key={addr.id} className={addr.id === selectedAddressId ? 'selected' : ''}>
                      <input
                        type="radio"
                        id={addr.id}
                        name="selectedAddress"
                        checked={addr.id === selectedAddressId}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <label htmlFor={addr.id}>
                        <p><strong>{addr  .name}</strong></p>
                        <p>{addr.phone}</p>
                        <p>{addr.address}</p>
                        <p>{addr.pincode}</p>
                      </label>
                      <button
                        onClick={() => openAddEditPopup(addr)}
                        style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px', marginRight: '8px', borderRadius: '4px' }}
                      >
                        <FaEdit style={{ marginRight: '5px' }} />
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDeleteAddress(addr.id)} // Call the new function
                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px' }}
                      >
                        <FaTrash style={{ marginRight: '5px' }} />
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="add-address-btn" onClick={() => openAddEditPopup()}>
                  Add another address
                </button>
              </>
            )}
          </section>

          <section className="payment-method-section">
            <h3>Payment method</h3>
            <p>Payment method will be selected in the next step.</p>
          </section>

         

          {/* Link back to cart only if coming from cart */}
          {itemsFromCart && <p className="back-cart"><a href="/cart">← Back to cart</a></p>}

        </div>

        <div className="checkout-right">
          <div className="summary-box">
            <button disabled className="deliver-btn">Deliver to this address</button>
            {/* Display total based on itemsToPurchase */}
            <p><strong>Items:</strong> ₹{totalAmount.toFixed(2)}</p>
            <p><strong>Delivery:</strong> ₹</p>
            <p><strong>Order Total:</strong> ₹{totalAmount.toFixed(2)}</p>
            <button className="proceed-btn" onClick={handleContinue}>Proceed to Payment</button>
          </div>
        </div>
      </div>

      {/* Address Popup */}
      {showPopup && (
        <div className="address-popup">
          <div className="checkout-form">
            <div className="popup-header"> {/* Added header div */}
              <h5 className="gradient-text">{formData.id ? 'Edit' : 'Add'} Delivery Details</h5>
              <button className="close-popup-btn" onClick={() => setShowPopup(false)}> {/* Added close button */}
                <FaTimes />
              </button>
            </div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              required
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={e => setFormData({ ...formData, pincode: e.target.value })}
              required
            />
            {errors.pincode && <p className="error-text">{errors.pincode}</p>}

            <div className="btn-row">

              <button className="proceed-btn" onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this address?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAddressConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Buy;
