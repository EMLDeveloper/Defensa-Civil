export interface registro extends Record<string, any>{
    cedula?: string;
    nombre?:string;
    apellido?:string;
    clave?: string;
    correo?:string;
    telefono?:string;
}