import { name } from "dayjs/locale/es"

export const menuSuperAdmin = [
    {
        name: 'inicio',
        icon: '',
        submenu:[
            {
                name: 'Proyecto',
                path: '/proyecto',
                icon: '',
            }
        ]
    }

]

export const menuAdmin = [
    {
        name: 'Proyectos',
        icon: '',
        submenu:[
            {
                name: 'Proyecto',
                path: '/proyecto',
                icon: '',
            },
            {
                name: 'Crear proyecto',
                path: '/proyecto/crearproyectos',
                icon: '',
            },
            {
                name:'Graficas',
                path: '/proyecto/graficas',
                icon: '',
            }

        ]
    },
    {
        name: 'Pruebas',
        icon: '',
        
        submenu:[
            {
              

                name: 'Listar pruebas',
                path: '/pruebas',
                icon: '',
                
            },
            {
              

                name: 'Crear pruebas',
                path: '/pruebas/crear',
                icon: '',
                
            }
        ]
    }
]

export const menuUser = [
    {
        name: 'proyecto',
        icon: '',
        submenu:[
            {
                name: 'Perfil',
                path: '/perfil',
                icon: '',
            }
        ]
    },
    {
        name: 'Gestiones',
        icon: '',
        submenu:[
            {
                name: 'permisos',
                path: '/perfil/permisos',
                icon: '',
            }
        ]
    }
]