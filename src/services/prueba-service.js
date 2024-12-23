
import { apiService } from "./api-service";

class PruebaService {
    async createPrueba(formData) {

        try {
            const response = await apiService.post({
                url: '/prueba/',
                data: formData,
            });

            return response.data;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error; // Re-throw the error for further handling (optional)
        }
    }

    async createCriterioAceptacion(formData) {

        try {
            const response = await apiService.post({
                url: '/criterioaceptacion/',
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error; // Re-throw the error for further handling (optional)
        }
    }

    async getPruebas() {
        try {
            const response = await apiService.get({
                url: '/prueba/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los pruebas:", error);
            throw error;
        }
    }

    async getProyectos() {
        try {
            const response = await apiService.get({
                url: '/proyecto/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los pruebas:", error);
            throw error;
        }
    }
    

    async getEstadosPrueba() {
        try {
            const response = await apiService.get({
                url: '/estadoprueba/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los el estado del prueba:", error);
            throw error;
        }
    }

    async getPruebaById(id) {
        try {
            const response = await apiService.get({
                url: `/prueba/${id}/`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }

    async getCriterioAceptacion(id) {
        try {
            const response = await apiService.get({
                url: `/criterioaceptacion/?idprueba=${id}`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }

    async getBugs(id) {
        try {
            const response = await apiService.get({
                url: `/bugs/?idprueba=${id}`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }

    async aceptarCriterio(id, data) {
        try {
            const response = await apiService.patch({
                url: `/criterioaceptacion/${id}/`,
                data: data,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar el criterio:", error);
            throw error;
        }
    }
    
    async cambiarEstadoBug(id, formData) {
        try {
            const response = await apiService.patch({
                url: `/bugs/${id}/`,
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
            throw error;
        }
    }

    async updatePrueba(id, formData) {
        try {
            const response = await apiService.put({
                url: `/prueba/${id}/`,
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
            throw error;
        }
    }

    async deletePrueba(id) {
        try {
            const response = await apiService.delete({
                url: `/prueba/${id}/`,
            });

            return response;
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            throw error;
        }
    }
}


export const pruebaService = Object.freeze(new PruebaService())