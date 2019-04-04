import { Usuario } from './usuario.model';

export class Empresa {

    constructor(
        public _id: string,
        public nombre: string,
        public img?: string,
        public usuario?: Usuario,
    ) {}

}
