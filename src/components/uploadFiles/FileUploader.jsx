import React from "react";
import Uploader from "./Uploader";

function FileUploader() {

  //funcion para obtener nombre
  const handleFileName = (fileName) => {
    return fileName;
  };

  return (
    <Uploader
      acceptedTypes={/\.pdf$/i}
      errorMessage="Por favor selecciona un archivo PDF."
      successMessage="La URL del archivo es: "
      handleFileName={handleFileName}
    />
  );
}

export default FileUploader;