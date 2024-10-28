
import { apiService } from "./api-service";

class RequerimientosService {
    async createRequerimientos(formData) {

        try {
            const response = await apiService.post({
                url: '/requerimientos/',
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            throw error; // Re-throw the error for further handling (optional)
        }
    }

    async getRequerimientos(idProyecto) {
        try {
            const response = await apiService.get({
                url: `/requerimientos/?idProyecto=${idProyecto}`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los requerimientoss:", error);
            throw error;
        }
    }

    async getEstadosRequerimientos() {
        try {
            const response = await apiService.get({
                url: '/estadorequerimientos/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los el estado del requerimientos:", error);
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

    async getRequerimientosById(id) {
        try {
            const response = await apiService.get({
                url: `/requerimientos/${id}/`,

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener la complejidad:", error);
            throw error;
        }
    }

    async getUsuarios(id) {
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

    async updateRequerimientos(id, formData) {
        try {
            const response = await apiService.put({
                url: `/requerimientos/${id}/`,
                data: formData,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
            throw error;
        }
    }

    async deleteRequerimientos(id) {
        try {
            const response = await apiService.delete({
                url: `/requerimientos/${id}/`,
            });

            return response;
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            throw error;
        }
    }
}


export const requerimientosService = Object.freeze(new RequerimientosService())