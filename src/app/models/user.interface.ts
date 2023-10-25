import { IdentificationType } from "./identification-type.interface";
import { Role } from "./role.interface";

export interface User {
  userId:               number,
  firstName:            string,
  middleName:           string,
  lastName:             string,
  secondLastName:       string,
  identificationType:   IdentificationType,
  identificationNumber: string,
  email:                string,
  role:                 Role
}
