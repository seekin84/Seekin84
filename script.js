import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAak5U5BgaaAIodrH7B-zx7rn__KunrC10",
  authDomain: "cmuacademy.firebaseapp.com",
  projectId: "cmuacademy",
  storageBucket: "cmuacademy.firebasestorage.app",
  messagingSenderId: "909397591831",
  appId: "1:909397591831:web:55d5b77cb1e230d32e1952"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const secretCode = "seekblue84";

window.checkCode = function() {
  const code = document.getElementById("codeInput").value;
  if(code === secretCode){
    document.getElementById("announcementSection").style.display = "block";
  }
}

window.postAnnouncement = async function(){
  const text = document.getElementById("announcementText").value;

  await setDoc(doc(db, "announcements", "current"), {
    message: text
  });

  document.getElementById("announcementDisplay").innerText = text;
}

async function loadAnnouncement(){
  const docRef = doc(db, "announcements", "current");
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    document.getElementById("announcementDisplay").innerText = docSnap.data().message;
  }
}

loadAnnouncement();