import firebase from 'firebase/app';
import 'firebase/firestore'

const firestore = firebase.firestore();

firestore.collection('users').doc('eMmcFoLmslr28q87tWWX').collection('cartItems').doc('noqofxQaGzGcf2EnWfs4');
firestore.doc('/users/eMmcFoLmslr28q87tWWX/cartItems/noqofxQaGzGcf2EnWfs4');
firestore.collection('/users/eMmcFoLmslr28q87tWWX/cartItems');