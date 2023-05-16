import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react"
import Header from "../components/Header"
import db from "../../firebase"
import { collection, doc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import moment from "moment";

const orders = ({ orders }) => {
  const { data: session } = useSession();

  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
        {session ? (
          <h2>x Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 sapce-y-4"></div>
      </main>
    </div>
  );
};

export default orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  //get user login credentials...
  const session = await getSession(context);

  if (!session) {
    return {
      props: {}
    };
  }
  // firebase db
//   const firebaseApp = initializeApp(db);
//   const firestoreInstance = getFirestore(firebaseApp);

  const stripeOrders = await getDocs(collection(db, 'users', session.user.email, 'orders'), { orderBy: 'timestamp', desc: true });

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => {
      const orderData = order.data();
      return {
        id: order.id,
        amount: orderData.amount,
        amountShipping: orderData.amount_shipping,
        images: orderData.images,
        timestamp: moment(orderData.timestamp.toDate()).unix(),
        items: (await stripe.checkout.session.listLineItems(order.id, { limit: 100 })).data
      };
    })
  );

  return {
    props: {
      orders
    }
  };
}