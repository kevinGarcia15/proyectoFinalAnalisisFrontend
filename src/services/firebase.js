import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

// Configuracion de la conexion a firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1dUuisFsBlR0P4FxwA0gHSoaEm0AkMd8",
  authDomain: "front-payroll-gt.firebaseapp.com",
  projectId: "front-payroll-gt",
  storageBucket: "front-payroll-gt.appspot.com",
  messagingSenderId: "35855236911",
  appId: "1:35855236911:web:f92f3758fd9617ae3d6bda"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

class UploadFirebaseService {
  // Instancia estática privada para el singleton
  static #instance;

  // Método para obtener la instancia singleton
  static getInstance() {
    if (!UploadFirebaseService.#instance) {
      UploadFirebaseService.#instance = new UploadFirebaseService();
    }
    return UploadFirebaseService.#instance;
  }

  // Metodo llamado desde componentes para subir imagenes
  async uploadFile(file, fileName) {
    const newNameFile = fileName + v4()
    const storageRef = ref(storage, newNameFile); 
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}

export default UploadFirebaseService; 