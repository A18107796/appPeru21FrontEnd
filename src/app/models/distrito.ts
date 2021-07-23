import { Provincia } from "./provincia";

export class Distrito {
    id!: number;
    nombre!: string;
    provincia: Provincia;

    public constructor() {
        this.provincia = new Provincia();
    }
}
