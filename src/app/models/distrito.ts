import { Provincia } from "./provincia";

export class Distrito {
    id_distrito!: number;
    nombre!: string;
    provincia: Provincia;

    public constructor() {
        this.provincia = new Provincia();
    }
}
