
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,collection, addDoc,getDocs,deleteDoc} from "firebase/firestore";
import { doc } from "firebase/firestore";

const firebaseConfig = {
  
  authDomain: "olx-project-8ec58.firebaseapp.com",
  projectId: "olx-project-8ec58",
  storageBucket: "olx-project-8ec58.appspot.com",
  messagingSenderId: "985434156829",
  appId: "1:985434156829:web:9cb307edfb13576a457bf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export async function register(userInfo){
  try{
    const {email,fullname, password} = userInfo
    await   createUserWithEmailAndPassword(auth, email, password)
    
   await   addDoc(collection(db, "users"),{
   fullname, email, 
  });
    

     alert ("succesfullly registered")
    }
    
    catch (e)  {
  
     alert(e.message)
    };
  
  }
  export async function login(userInfo){

  const {email,password} =userInfo
    await   signInWithEmailAndPassword(auth, email, password)
   
      alert ("logged in successfully")
    }
  
  

  export async function sell1(ad){
  
    try{
      const {title,price, description, image} = ad
console.log(title)
console.log(price)
console.log(description)
console.log(image)




      const storageRef = ref(storage, `ads/${image.name}`);
await uploadBytes(storageRef, image)

 const url = await getDownloadURL(storageRef)
 
  await   addDoc(collection(db, "ads"),{
     price, title, description, imageUrl: url,

    });
        alert("Ad posted Successfullly")
       
 
     }
        

     catch (e)  {
      
       alert(e.message)
      };
      


   }
   
export async function getAds(){
  const querySnapshot = await getDocs(collection(db, "ads"));
  const ads=[]
  querySnapshot.forEach((doc) => {
    const ad = doc.data()
    ad.id = doc.id
    ads.push(ad)
  });
  return ads
}


export const ProfileData = async () => {
  const postAds = []
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const dat = doc.data()
    dat.id = doc.id
    console.log(dat.id , 'dat.id')
    postAds.push(dat)
    console.log(postAds, 'postAds')
  });
  return postAds
}
ProfileData()


export async function updateData(e, img) {
 
  const userd = e[0]
 
try {

  const storageRef = ref(storage, `profile image/${img.name}`);
  await uploadBytes(storageRef, img);
  const Url = await getDownloadURL(storageRef)
// console.log(Url , '--->url');
  await addDoc(collection(db, "users"), {
    fullname:userd.fullname,
    email:userd.email,
    image:Url
  });
 
 const ver = await deleteDoc(doc(db,"users",userd.id))
    console.log(ver)
  
  alert("Profile is Updated . ")

}catch(e){
console.log(e.message)
}

  }