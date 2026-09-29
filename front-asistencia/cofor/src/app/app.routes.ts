import { Routes } from '@angular/router';
import { CrearSesion } from './componentes/crear-sesion/crear-sesion';
import { Auth } from './componentes/auth/auth';
import { Sesiones } from './componentes/sesiones/sesiones';
import { Alumno } from './componentes/alumno/alumno';
import { UnirseGrupo } from './componentes/unirse-grupo/unirse-grupo';
import { AsignarAlumno } from './componentes/asignar-alumno/asignar-alumno';
import { Usuarios } from './componentes/usuarios/usuarios';
import { Asistencia } from './componentes/asistencia/asistencia';
import { CrearAsistencia } from './componentes/crear-asistencia/crear-asistencia';
import { Registrarse } from './componentes/registrarse/registrarse';
import { Grupos } from './componentes/grupos/grupos';
import { Promociones } from './componentes/promociones/promociones';
import { ExplorarGrupos } from './componentes/explorar-grupos/explorar-grupos';

export const routes: Routes = [
    {
        path: '',
        component: Auth
    },
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'sesiones',
        component: Sesiones
    },
    {
        path: 'crear-sesion',
        component: CrearSesion
    },
    {
        path: 'asistencia',
        component: Asistencia
    },
    {
        path: 'crear-asistencia/:id_group',
        component: CrearAsistencia
    },
    {
        path: 'registrarse',
        component: Registrarse
    },
    {
        path: 'grupos',
        component: Grupos
    },
    {
        path: 'promociones',
        component: Promociones
    },
    {
        path: 'usuarios',
        component: Usuarios
    },
    {
        path: 'alumno',
        component: Alumno
    },
    {
        path: 'unirse-grupo',
        component: UnirseGrupo
    },
    {
        path: 'explorar-grupos',
        component: ExplorarGrupos
    },
    {
        path: 'asignar-alumno',
        component: AsignarAlumno
    }
];
