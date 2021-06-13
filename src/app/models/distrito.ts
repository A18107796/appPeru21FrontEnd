import { Provincia } from "./provincia";

export class Distrito {
    id_distrito!: number;
    nombre_distrito!: string;
    provincia: Provincia;

    public constructor() {
        this.provincia = new Provincia();
    }
}
