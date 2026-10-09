import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//lười thêm vô environment quá nên để v luôn=))
const firebaseConfig = {
  apiKey: "AIzaSyDFK3QPqZk4klVNov6_54H_PuWhxB88lnU",
  authDomain: "ss008-qna.firebaseapp.com",
  projectId: "ss008-qna",
  storageBucket: "ss008-qna.firebasestorage.app",
  messagingSenderId: "237109315328",
  appId: "1:237109315328:web:4f53461e7f6f7a85c015e5",
  measurementId: "G-YSCEMFQPXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo và xuất kết nối Database
export const db = getFirestore(app);