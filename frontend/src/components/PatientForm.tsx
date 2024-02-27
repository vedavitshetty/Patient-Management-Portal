import React, { useState } from 'react';
import { Patient } from '../common/types';

interface PatientFormProps {
    initialValues?: Patient;
    onSubmit: (data: Patient) => void;
}

export const PatientForm = ({ initialValues = {
    id: 0,
    firstName: '',
    middleName: '', 
    lastName: '',
    dateOfBirth: '',
    status: 'INQUIRY',
    addresses: [],
    customData: [],
}, onSubmit }: PatientFormProps) => {
    const [patientData, setPatientData] = useState<Patient>(initialValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleAddressChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAddresses = patientData.addresses.map((address, addrIndex) => 
            addrIndex === index ? { ...address, [e.target.name]: e.target.value } : address
        );
        setPatientData({ ...patientData, addresses: updatedAddresses });
    };

    const handleCustomDataChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const updatedCustomData = patientData.customData?.map((customField, fieldIndex) => 
            fieldIndex === index ? { ...customField, [e.target.name]: e.target.value } : customField
        );
        setPatientData({ ...patientData, customData: updatedCustomData ?? [] });
    };

    const addAddress = () => {
        setPatientData({
            ...patientData,
            addresses: [...patientData.addresses, { addressLine1: '', addressLine2: '', city: '', state: '', zipCode: '' }]
        });
    };

    const removeAddress = (index: number) => {
        const updatedAddresses = patientData.addresses.filter((_, addrIndex) => addrIndex !== index);
        setPatientData({ ...patientData, addresses: updatedAddresses });
    };

    const addCustomData = () => {
        setPatientData({
            ...patientData,
            customData: [...(patientData.customData || []), { fieldName: '', fieldType: 'TEXT', fieldValue: '' }]
        });
    };

    const removeCustomData = (index: number) => {
        const updatedCustomData = patientData.customData?.filter((_, fieldIndex) => fieldIndex !== index) || [];
        setPatientData({ ...patientData, customData: updatedCustomData });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(patientData);
    };

    return (
        <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <input type="text" name="firstName" value={patientData.firstName} onChange={handleInputChange} placeholder="First Name" />
        <input type="text" name="middleName" value={patientData.middleName} onChange={handleInputChange} placeholder="Middle Name" />
        <input type="text" name="lastName" value={patientData.lastName} onChange={handleInputChange} placeholder="Last Name" />
        <input type="date" name="dateOfBirth" value={patientData.dateOfBirth} onChange={handleInputChange} />
        <select name="status" value={patientData.status} onChange={handleSelectChange}>
            <option value="INQUIRY">Inquiry</option>
            <option value="ONBOARDING">Onboarding</option>
            <option value="ACTIVE">Active</option>
            <option value="CHURNED">Churned</option>
        </select>

        {/* Dynamic Addresses */}
        {patientData.addresses?.map((address, index) => (
            <div key={index} className="address-fields">
                <input type="text" name="addressLine1" value={address.addressLine1} onChange={(e) => handleAddressChange(index, e)} placeholder="Address Line 1" />
                <input type="text" name="addressLine2" value={address.addressLine2} onChange={(e) => handleAddressChange(index, e)} placeholder="Address Line 2" />
                <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} placeholder="City" />
                <input type="text" name="state" value={address.state} onChange={(e) => handleAddressChange(index, e)} placeholder="State" />
                <input type="text" name="zipCode" value={address.zipCode} onChange={(e) => handleAddressChange(index, e)} placeholder="Zip Code" />
                <button type="button" onClick={() => removeAddress(index)}>Remove</button>
            </div>
        ))}
        <button type="button" onClick={addAddress}>Add Address</button>

        {/* Dynamic Custom Data */}
        {patientData.customData?.map((customField, index) => (
            <div key={index} className="custom-data-fields">
                <input type="text" name="fieldName" value={customField.fieldName} onChange={(e) => handleCustomDataChange(index, e)} placeholder="Field Name" />
                <select name="fieldType" value={customField.fieldType} onChange={(e) => handleCustomDataChange(index, e)}>
                    <option value="TEXT">Text</option>
                    <option value="NUMBER">Number</option>
                    <option value="DATE">Date</option>
                </select>
                <input type="text" name="fieldValue" value={customField.fieldValue} onChange={(e) => handleCustomDataChange(index, e)} placeholder="Field Value" />
                <button type="button" onClick={() => removeCustomData(index)}>Remove</button>
            </div>
        ))}
        <button type="button" onClick={addCustomData}>Add Custom Data</button>

        <button type="submit" className="save-patient-btn">Save Patient</button>
        </form>
    );
};
