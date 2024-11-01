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