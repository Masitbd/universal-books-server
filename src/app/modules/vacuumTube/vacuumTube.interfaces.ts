import { Model } from "mongoose"

export type IVacuumTube = {
    value: string,
    label: string,
    price: string,
    description: string,
}

export type VacuumTubeModel = Model<IVacuumTube, Record<string, unknown>>