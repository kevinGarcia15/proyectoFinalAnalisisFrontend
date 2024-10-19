import React from "react";
import Uploader from "./Uploader";

function ImgUploader() {

  // funcion para obtener nombre
  const handleFileName = (fileName) => {
    return fileName;
  };

  return (
    <Uploader
      acceptedTypes={/\.(jpg|jpeg|png)$/i}
      errorMessage="Por favor selecciona un archivo de imagen (JPEG, PNG o JPG)."
      successMessage="La URL de la imagen es: "
      handleFileName={handleFileName}
    />
  );
}

export default ImgUploader;