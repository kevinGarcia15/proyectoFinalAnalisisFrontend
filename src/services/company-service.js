
import { apiService } from "./api-service";

// ------Ejemplo de USO CREATECOMPANY
// companyService
//     .createCompany(
//         'Cian',
//         '01234567',
//         'descripcion',
//         'adress',
//         'picture',
//         'Cian@gmail',
//         'admin123',
//     )
//     .then(companyRes => {
//         console.log('Respuesta al ingresar compañía:', companyRes)
//     })
//     .catch(companyErr => {
//         console.error('Error al ingresar compañía:', companyErr)
//     })


class CompanyService {
    async createCompany(name, phone, description, address, picture, email, password) {
        const companyData = {
            name,
            phone,
            description,
            address,
            picture,
            email,
            password, // Include password in the data
        };

        try {
            const response = await apiService.post({
                url: '/company/',
                data: companyData,
            });

            return response;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error; // Re-throw the error for further handling (optional)
        }
    }


// CONSULTANDO EMPRESAS REGISTRADAS:
// EJEMPLO DE USO getCompanies:
//         companyService
//         .getCompanies()
//   .then(companies => {
//             console.log('Empresas registradas:', companies)
//     
//   })
//   .catch (error => {
//     console.error('Error al obtener las empresas:', error)
// })
    async getCompanies() {
        try {
            const response = await apiService.get({
                url: '/company/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener las empresas:", error);
            throw error;
        }
    }





// EJEMPLO DE USO: updateCompany----------------------
//     const companyId = 1 // ID de la empresa que deseas actualizar
//     companyService
//   .updateCompany(
//         companyId,
//     'Telus',
//     '12345687',
//     'CallCenter',
//     'xela',
//     'pic',
//     )
//   .then(updateRes => {
//         console.log('Respuesta al actualizar compañía:', updateRes)
//   })
//   .catch (updateErr => {
//     console.error('Error al actualizar compañía:', updateErr)
// })
    async updateCompany(id, name, phone, description, address, picture) {
        const companyData = {
            name,
            phone,
            description,
            address,
            picture
        };

        try {
            const response = await apiService.put({
                url: `/company/${id}/`,
                data: companyData,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
            throw error;
        }
    }





    //  EJEMPLO DE USO:deleteCompany-----------
//     const companyIdToDelete = 456; // ID de la empresa que deseas eliminar
// companyService.deleteCompany(companyIdToDelete)
// .then(deleteRes => {
//         console.log('Respuesta al eliminar compañía:', deleteRes);
// })
// .catch (deleteErr => {
//     console.error('Error al eliminar compañía:', deleteErr);
// });


    async deleteCompany(id) {
        try {
            const response = await apiService.delete({
                url: `/company/${id}/`,
            });

            return response;
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            throw error;
        }
    }
}


export const companyService = Object.freeze(new CompanyService())