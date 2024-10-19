import { addCompany, updateCompany, deleteCompany } from '../../redux/actions';

//funcion para añadir company en lista de store redux
export const handleAddCompanyAction = (dispatch) => {
  const newCompanyData = {
      id: 3,
      name: 'Empresa 3',
      phone: 'phone Empresa 3',
      description: 'description Empresa 3',
      address: 'address Empresa 3',
      picture: 'picture  Empresa 3',
    };
  //Se llama al action: addCompany y se envia el payload(objeto) newCompanyData   
  dispatch(addCompany(newCompanyData));
};

//funcion para actualizar company en lista de store redux
export const handleUpdateCompanyAction = (dispatch) => {
  const updatedCompanyData = {
      id: 1,
      name: 'Empresa 1 actualizada',
      phone: 'phone Empresa 1 actualizada',
      description: 'description Empresa 1 actualizada',
      address: 'address Empresa 1 actualizada',
      picture: 'picture  Empresa 1 actualizada',
    };
    //Se llama al action: updateCompany y se envia el payload(objeto) updatedCompanyData
  dispatch(updateCompany(updatedCompanyData));
};

//funcion para borrar company en lista de store redux
export const handleDeleteCompanyAction = (dispatch) => {
  const companyIdToDelete = 1;
  //Se llama al action: deleteCompany y se envia el payload(constante id) companyIdToDelete
  dispatch(deleteCompany(companyIdToDelete));
};