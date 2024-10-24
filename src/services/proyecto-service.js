
import { apiService } from "./api-service";

class ProyectoService {
    async createProyecto(formData) {

        try {
            const response = await apiService.post({
                url: '/proyecto/',
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error; // Re-throw the error for further handling (optional)
        }
    }

    async getProyectos() {
        try {
            const response = await apiService.get({
                url: '/proyecto/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los proyectos:", error);
            throw error;
        }
    }

    async getEstadosProyecto() {
        try {
            const response = await apiService.get({
                url: '/estadoproyecto/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los el estado del proyecto:", error);
            throw error;
        }
    }

    async getTiposRequerimiento() {
        try {
            const response = await apiService.get({
                url: '/tiporequerimiento/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los tipos de requerimientos:", error);
            throw error;
        }
    }

    async getPrioridad() {
        try {
            const response = await apiService.get({
                url: '/prioridad/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener las prioridades:", error);
            throw error;
        }
    }


    async getComplejidad() {
        try {
            const response = await apiService.get({
                url: '/complejidad/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
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


export const proyectoService = Object.freeze(new ProyectoService())