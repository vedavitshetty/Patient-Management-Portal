export type UnauthenticatedFormType = 'login' | 'createAccount' | 'forgotPassword';

type PatientAddress = {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
}
type PatientCustomData = {
    fieldName: string;
    fieldType: string;
    fieldValue: string;
}
export type Patient = {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    status: string;
    addresses: PatientAddress[];
    customData?: PatientCustomData[];
    primaryCity?: string;
    primaryState?: string;
  }