import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useGetSingleUserOrdersQuery } from '../redux/features/orders/orderApi';
import { useGetAllUserQuery, useGetUserMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';


const statusColors = {
  Pending: 'bg-yellow-500',
  Shipped: 'bg-blue-500',
  Delivered: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //const  [ getSingleUserOrders]=useGetSingleUserOrdersQuery()
  const [userData, setUserData] = useState(null);
  const [getUser, { data, isLoading, isError, error }] = useGetUserMutation();
  const { data23:userInfo} = useGetAllUserQuery();
 

  const navigate = useNavigate()

  const openDialog = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
    setIsDialogOpen(false);
  };

  const localUser = JSON.parse(localStorage.getItem('user'));

  const userId = localUser?._id


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId).unwrap();
        console.log('responsesssss', response);
        setUserData(response)

      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, getUser]);

  const orderDetail = userData?.user?.orders || [];
 

  //back button
  const handleBack = () => {
    navigate('/')
  }

  return (<>
       <div className='mt-20'>
       <button
        onClick={handleBack}
        className="px-4 py-1 mt-1 mr-1 border hover:bg-green-700 hover:text-white  text-black rounded-lg"
      >
        <i className="ri-arrow-left-line"></i> Back
      </button>

    <div className="container mx-auto py-6">

      <h1 className="text-lg  sm:text-xl md:text-2xl  lg:text-3xl  xl:text-3xl   font-bold mb-6 text-center align-middle">Order Management</h1>
      <div className="border rounded shadow">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-lg  sm:text-xl md:text-2xl  lg:text-3xl  xl:text-3xl  font-semibold">Orders</h2>
        </div>
        <div className="p-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr className='px-3 sm:px-4  md:px-4 lg:px-4 xl:px-4'>
                <th className="border border-gray-300  py-2">Order ID</th>
                {/* <th className="border border-gray-300 px-4 py-2">Customer</th> */}
                <th className="border border-gray-300  py-2">Total Amount</th>
                <th className="border border-gray-300  py-2">Status</th>
                <th className="border border-gray-300  py-2">Date</th>
                <th className="border border-gray-300  py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.map((order) => (
                <tr key={order?._id}>
                  {/* Display Order ID */}
                  <td className="border  border-gray-300 px-4 py-2 text-center align-middle">{order?._id}</td>

                  {/* Display User ID (Replace with actual user name if available in userData) */}
                  {/* <td className="border border-gray-300 px-4 py-2">{order.userId}</td> */}

                  {/* Display Total Amount */}
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">${order?.totalAmount?.toFixed(2)}</td>

                  {/* Display Order Status */}
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                    <span
                      className={`px-2 py-1 rounded-2xl text-white ${statusColors[order?.orderStatus] || 'bg-gray-500'
                        }`}
                    >
                      {order?.orderStatus}
                    </span>
                  </td>

                  {/* Display Order Date */}
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                    {format(new Date(order?.orderDate), 'MMM dd, yyyy')}
                  </td>

                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => openDialog(order)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {isDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex mt-20 justify-center items-center">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-gray-300">

            {/* Header */}
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2">Order Details</h2>

            {/* Order Information */}
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-blue-600">Order ID:   </strong> {selectedOrder?._id}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Customer ID:    </strong> {selectedOrder?.userId}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Date:   </strong>{' '}
                {format(new Date(selectedOrder?.orderDate), 'MMM dd, yyyy HH:mm')}
              </p>
              <p className="text-gray-700">
                <strong className="text-blue-600">Status:   </strong>{' '}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder?.orderStatus] || 'bg-gray-500 text-white'
                    }`}
                >
                  {selectedOrder?.orderStatus}
                </span>
              </p>
            </div>

            {/* Products Table */}
            <h3 className="text-lg font-semibold text-blue-700 mt-6">Products</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 mt-3 text-sm">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                    <th className="border border-gray-300 px-4 py-2">Product</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace this section with actual product mapping */}

                  {selectedOrder?.items?.map((item, index) => (
                    <tr key={item?._id} className="text-gray-700">
                        <td className="border border-gray-300 px-4 py-2 ">
                          <img src={item?.product?.images[0]} alt="" className='border border-green-500' /></td>
                      <td className="border border-gray-300 px-4 py-2">Product{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2">{item?.product?.name}</td>
                      <td className="border text-center border-gray-300 px-4 py-2">{item?.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">${(item?.totalPrice / item?.quantity)?.toFixed(2)}</td>

                      <td className="border border-gray-300 px-4 py-2">${item?.totalPrice?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <p className="text-xl font-semibold text-blue-800 mt-4">
              Total: <span className="text-green-600">${selectedOrder?.totalAmount?.toFixed(2)}</span>
            </p>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  </>
  );
}




