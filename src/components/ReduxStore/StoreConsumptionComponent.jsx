import React, { Component } from 'react';
import { connect } from 'react-redux';
//importamos los controladores de eventos 
import { handleAddCompanyAction, handleUpdateCompanyAction, handleDeleteCompanyAction } from './CompanyEventHandlers'; 

class StoreConsumptionComponent extends Component {

  //Metodos para el ciclo de vida de un componente
  componentDidMount() {
    console.log('El componente StoreConsumptionComponent se ha montado');
  }

  componentDidUpdate(prevProps) {
    // Comparar las props actuales con las props anteriores
    if (prevProps.companiesList !== this.props.companiesList) {
      console.log('La lista de empresas ha cambiado.');
      // Se pueden crear alguna accion en respuesta al cambio, si es necesario
    }
  }

  componentWillUnmount() {
    console.log('El componente StoreConsumptionComponent se desmontará');
  }

   //Funciones para mandar a llamar a un action 
   handleAddCompany = () => {
    //Obtiene dispatch de las props
    const { dispatch } = this.props;
    //Pasa dispatch a la función handleAddCompanyAction
    handleAddCompanyAction(dispatch); 
  };

  handleUpdateCompany = () => {
    //Obtiene dispatch de las props
    const { dispatch } = this.props; 
    //Pasa dispatch a la función handleUpdateCompanyAction
    handleUpdateCompanyAction(dispatch);
  };

  handleDeleteCompany = () => {
    //Obtiene dispatch de las props
    const { dispatch } = this.props;
    //Pasa dispatch a la función handleDeleteCompanyAction
    handleDeleteCompanyAction(dispatch); 
  };

  render() {
    const { companiesList } = this.props;

    return (
      <div>
        {/* Botones para mandar a llamar a las arrow functions que a su vez llaman a los action */}
        <button onClick={this.handleAddCompany}>Agregar Empresa</button>
        <br />
        <button onClick={this.handleUpdateCompany}>Actualizar Empresa</button>
        <br />
        <button onClick={this.handleDeleteCompany}>Eliminar Empresa</button>
        <br />
        
        <br />
        <h2>LISTA DE EMPRESAS</h2>
        <ul>
          {/* Lectura de la lista companies en store */}
          {companiesList.map(company => (
            <li key={company.id}>
              <strong> Nombre: </strong>  {company.name}
              <strong> Phone: </strong>  {company.phone}
              <strong> Description: </strong>  {company.description}
              <strong> Address: </strong>  {company.address}
              <strong> Picture: </strong>  {company.picture}
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

//Funcion para definir que parte del store nos interesa utilizar
const mapStateToProps = (state) => ({
  companiesList: state.companiesList
});

//Suscribimos a nuestro componente con el store
export default connect(mapStateToProps)(StoreConsumptionComponent);