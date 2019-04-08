import { Usuario } from './usuario.model';

export class Alumno {

    constructor(
        public _id: string,
        public nombre: string,
        public email: string,
        public telefono: string,
        public usuario?: Usuario,
    ) {}

}
