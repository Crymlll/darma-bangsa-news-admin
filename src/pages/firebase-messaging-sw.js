import * as firebase from "firebase/app";
import 'firebase/database'

import { messaging } from '../firebase/firebase'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Head from 'next/head';

import { Box, Container, Grid, Pagination } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

if( 'function' === typeof importScripts){
    importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
    importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
}

// messaging.setBackgroundMessageHandler(function(payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true
//     })
//     .then(windowClients => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return registration.showNotification("my notification title");
//     });
//   return promiseChain;
// });
const message = {
    to : "dFzPMCvNRMKgIrWsDFLPQP:APA91bH98_4gGCA8jhzh1aMIh5kBTAwFrCBYFgjYXgansWzSHNBgf-t1BmacN1tyXhu_1jqv-JoGqTX84jzGP8a3zv5Hx8b2UKYtZkGO61GtuFHEtHJja8ru98iFCYDe-_Q7UPDgf1ii",
    notification: {
      title: "This is a Notification",
      boby: "This is the body of the Notification",
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: "high",
      content_available: true,
    }
  }
  
  let headers = new Headers({
    "Content-Type" : "application/json",
    Authorization: "key=" + "AIzaSyA4chKxoj1an3ENg1zF8mOTR9kYbDnssl4",
  })

  try {
    // let response = await fetch ("https://fcm.googleapis.com/fcm/send",{
    let response = fetch ("https://fcm.googleapis.com/fcm/send",{
    method: "POST",
    headers,
    body: JSON.stringify(message),
  })
//   response = await response.json();
  response = response.json();
  console.log("response ", response);
  } catch (error) {
    console.log("error ", error);
  }

  
const Products = () => (
    <>
      <Head>
        <title>
          Berita Sekolah
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
          </Box>
          
          
        </Container>
      </Box>
    </>
  );
  
  Products.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Products;