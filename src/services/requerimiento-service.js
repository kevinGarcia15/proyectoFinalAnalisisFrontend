
import { apiService } from "./api-service";

class RequerimientosService {
    async crearRequerimiento(formData) {

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

    async getEstadosRequerimiento() {
        try {
            const response = await apiService.get({
                url: '/estadorequerimiento/',

            });

            return response.data;
        } catch (error) {
            console.error("Error al obtener los el estado del requerimientos:", error);
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

    async cambioEstado(id, idEstado) {
        try {
            const response = await apiService.patch({
                url: `/requerimientos/${id}/`,
                data: idEstado,
            });

            return response;
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
            throw error;
        }
    }

    async deleteRequerimiento(id) {
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