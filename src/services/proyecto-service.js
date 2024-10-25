
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

    async getProyectoById(id) {
        try {
            const response = await apiService.get({
                url: `/proyecto/${id}/`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }

    async updateProyecto(id, formData) {
        try {
            const response = await apiService.put({
                url: `/proyecto/${id}/`,
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
            throw error;
        }
    }

    async deleteProyecto(id) {
        try {
            const response = await apiService.delete({
                url: `/proyecto/${id}/`,
            });

            return response;
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            throw error;
        }
    }
}


export const proyectoService = Object.freeze(new ProyectoService())