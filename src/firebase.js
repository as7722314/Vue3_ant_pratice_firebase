import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';


const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export const getDataList = async(collect) => {
    const productsCollection = collection(db, collect);
    const querySnapshot = await getDocs(productsCollection);
    const productList = []
    let tmp = {}
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        productList.push({
            id: doc.id,
            data
        });
    });
    return productList
}

export const createData = async(collect, product) => {
    const productsCollection = collection(db, collect);
    return await addDoc(productsCollection, product);
}

export const getData = async(collect, id) => {
    const docRef = doc(db, collect, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let data = docSnap.data();
        return {
            id: docSnap.id,
            data
        }
    }
    return null
}

export const updateData = async(collect, id, data) => {
    const docRef = doc(db, collect, id);
    return await updateDoc(docRef, data);
}

export const deleteData = async(collect, id) => {
    return await deleteDoc(doc(db, collect, id));
}