
class SessionService
 {
  constructor() { }

  set(clave, valor) {
    const valorString = JSON.stringify(valor);
    sessionStorage.setItem(clave, valorString);
    // console.log('Valor guardado.  "' + valorString);
  }

  get(clave) {
    const valorString = sessionStorage.getItem(clave);
    //const valorJSON = JSON.parse(valorString);
    // console.log('Valor recuperado de sessionStorage bajo la clave "' + clave + '"---- ' + valorJSON);
    return valorString;
  }

  remove(clave) {
    sessionStorage.removeItem(clave);
    // console.log('Se ha eliminado el valor de sessionStorage bajo la clave "' + clave + '"' + sessionStorage);
    // console.log('Nuevo estado de sessionStorage:', sessionStorage);

  }

  removeAll() {
    Object.keys(sessionStorage).forEach(key => {
      sessionStorage.removeItem(key);
    });

    // console.log('Se han eliminado todas las claves de sessionStorage');
    // console.log('Nuevo estado de sessionStorage:', sessionStorage);
  }

}
export default Object.freeze(new SessionService())
