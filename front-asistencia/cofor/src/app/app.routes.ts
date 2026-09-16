import { Routes } from '@angular/router';
import { CrearSesion } from './componentes/crear-sesion/crear-sesion';
import { Auth } from './componentes/auth/auth';
import { Sesiones } from './componentes/sesiones/sesiones';
import { Alumnos } from './componentes/alumnos/alumnos';
import { Asistencia } from './componentes/asistencia/asistencia';
import { CrearAsistencia } from './componentes/crear-asistencia/crear-asistencia';
import { Registrarse } from './componentes/registrarse/registrarse';

export const routes: Routes = [
    {
        path: '',
        component: Auth
    },
    {
        path: 'sesiones',
        component:Sesiones
    },
    {
        path: 'crear-sesion',
        component: CrearSesion
    },
    {
        path:'asistencia',
        component: Asistencia
    },
    {
        path: 'crear-asistencia',
        component: CrearAsistencia
    },
    {
        path: 'registrarse',
        component: Registrarse
    }
];
