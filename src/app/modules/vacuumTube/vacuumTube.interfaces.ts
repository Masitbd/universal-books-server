import { Model } from "mongoose"

export type IVacuumTube = {
    value: string,
    label: string,
    price: number,
    description: string,
}

export type VacuumTubeModel = Model<IVacuumTube, Record<string, unknown>>