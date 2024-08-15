import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);
  return (
    <div className="py-10 px-5 max-sm:px-3">
      <h3 className="text-heading3-bold">Your Orders</h3>
      {!orders || orders.length === 0 ? (
        <p className="text-body-bold">You have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.order.map((order: OrderType) => (
            <div className="flex flex-col gap-4 p-4 hover:bg-gray-200">
              <div className="flex gap-20 max-md:flex-col max-md:gap-3">
                <p className="text-base-bold">Order ID: {order._id}</p>
                <p className="text-base-bold">
                  Total Amount: €{order.totalAmount}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {order.products.map((orderItem: OrderItemType) => (
                  <div className="flex gap-4">
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between p-1">
                      <p className="text-small-bold">
                        Title:{" "}
                        <span className="text-small-medium">
                          {orderItem.product.title}
                        </span>
                      </p>
                      {orderItem.color && (
                        <p className="text-small-bold">
                          Color:{" "}
                          <span className="text-small-medium">
                            {orderItem.color}
                          </span>
                        </p>
                      )}
                      {orderItem.size && (
                        <p className="text-small-bold">
                          Size:{" "}
                          <span className="text-small-medium">
                            {orderItem.size}
                          </span>
                        </p>
                      )}
                      <p className="text-small-bold">
                        Price:{" "}
                        <span className="text-small-medium">
                          €{orderItem.product.price}
                        </span>
                      </p>
                      <p className="text-small-bold">
                        Quantity:{" "}
                        <span className="text-small-medium">
                          {orderItem.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Orders;
export const dynamic = "force-dynamic";
