
import firebase from 'firebase';
export class AuthService {

    signUp(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    signIn(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
}