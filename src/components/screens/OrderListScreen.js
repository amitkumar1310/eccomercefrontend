import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
/* REACT BOOTSTRAP */
import { Table, Button,Card } from "react-bootstrap";

/* COMPONENTS */
import Message from "../Message";
import Loader from "../Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listOrders,getUserDetails } from "../../actions/orderActions";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();
const navigate=useNavigate();
  /* PULLING OUT STATE */
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;




  useEffect(() => {
    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && user.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  /* HANDLER */

  return (
    <div>
      <Card style={{backgroundColor:"wheat"}}>
      <h1>Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.User && order.User.name}</td>
                <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isDeliver ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="dark" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Card>
    </div>
  );
}

export default OrderListScreen;
