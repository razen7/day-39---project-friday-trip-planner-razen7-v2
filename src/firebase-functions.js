import { db, auth } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

let addUser = async (values) => {
    // Add a new document with a generated id
    let { email, password } = values;
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // console.log(user);
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error code:', errorCode, 'errorMessage', errorMessage);
            return false;
        });
}

let checkUserLogin = async ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            return true;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorCode: ', errorCode, 'errorMessage: ', errorMessage);
            return false;
        });

    // const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));

    // const querySnapshot = await getDocs(q);
    // let user = [];
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //     user.push(doc.id);
    // });
    // return user.length > 0 ? user[0] : false;
}

let addTripToFirestore = async (type, email, tripDetails) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "trips"), {
        type: type,
        user: email,
        tripDetails: tripDetails,
    });
    console.log("Document written with ID: ", docRef.id);
}

let getPlacesFirestore = async () => {
    let result = [];
    const q = query(collection(db, "trips"), where("user", "==", localStorage.getItem('email')));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
        result[result.length - 1].id = doc.id;
    });
    return result;
}

async function deleteTrip(documentId, setTrips) {
    await deleteDoc(doc(db, "trips", documentId));
    setTrips(await getPlacesFirestore());
}

async function getTripDetail(tripDocId) {
    const docRef = doc(db, "trips", tripDocId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function editTripToFirestore(type, email, tripDetails,documentId) {
    const docRef = doc(db, "trips", documentId);
    return await updateDoc(docRef, {
        type, email, tripDetails
    });
}

export { addUser, checkUserLogin, addTripToFirestore, getPlacesFirestore, deleteTrip, getTripDetail,editTripToFirestore };


