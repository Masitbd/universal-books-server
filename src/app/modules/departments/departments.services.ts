import { IDepartment } from "./departments.interfaces";
import { Departments } from "./departments.model";

export const department_services = {
    create_department :async (payload:IDepartment):Promise<IDepartment | null> => {
        const result = await Departments.create(payload);
        return result;
    }
}