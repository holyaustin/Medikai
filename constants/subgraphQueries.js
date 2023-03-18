import { gql } from "@apollo/client"

const GET_ADDED_DOCTORS = gql`
    {
        addedDoctors(first: 10) {
            id
            name
            doctorAddress
            doctorRegistrationId
            dateOfRegistration
            specialization
            hospitalAddress
        }
    }
`

const GET_ADDED_HOSPITALS = gql`
    {
        addedHospitals(first: 10) {
            id
            name
            hospitalAddress
            hospitalRegistrationId
            dateOfRegistration
            email
            phoneNumber
        }
    }
`

const GET_ADDED_PATIENTS = gql`
    {
        addedPatients(first: 10) {
            id
            name
            patientAddress
            dob
            bloodGroup
            phoneNumber
            dateOfRegistration
            vaccinationHash
            accidentHash
            chronicHash
            acuteHash
            publicKey
        }
    }
`

const GET_PUBLIC_KEYS = gql`
    {
        addedPublicKeys(first: 10) {
            id
            patientAddress
            publicKey
        }
    }
`

export {
    GET_ADDED_DOCTORS,
    GET_ADDED_HOSPITALS,
    GET_ADDED_PATIENTS,
    GET_PUBLIC_KEYS,
}
