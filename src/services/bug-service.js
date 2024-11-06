
import { apiService } from "./api-service";

class BugService {
    async createBug(formData) {

        try {
            const response = await apiService.post({
                url: '/bugs/',
                data: formData,
            });

            return response.data;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error; // Re-throw the error for further handling (optional)
        }
    }

    async getUsuarios() {
        try {
            const response = await apiService.get({
                url: '/users/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }

    async getBugs() {
        try {
            const response = await apiService.get({
                url: '/bug/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los bugs:", error);
            throw error;
        }
    }
    

    async getEstadosBug() {
        try {
            const response = await apiService.get({
                url: '/estadosbug/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los el estado del bug:", error);
            throw error;
        }
    }

    async getClasificaciones() {
        try {
            const response = await apiService.get({
                url: '/clasificaciones/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los el estado del bug:", error);
            throw error;
        }
    }
    
    async getBugById(id) {
        try {
            const response = await apiService.get({
                url: `/bug/${id}/`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }


    async deleteBug(id) {
        try {
            const response = await apiService.delete({
                url: `/bug/${id}/`,
            });

            return response;
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            throw error;
        }
    }
}


export const bugService = Object.freeze(new BugService())