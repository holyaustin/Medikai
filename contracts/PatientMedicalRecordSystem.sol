// SPDX-License-Identifier: GPL-3.0-only	

pragma solidity ^0.8.17;

/// @title A smart contract supporting the Decentralized Patient Medical Record System
/// @author Aditya Kumar Singh @ July 2022
/// @notice This smart contract is a part of my 2nd Year Summer Project
/// @dev All function calls are currently implemented without side effects

//imports
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {DoctorType} from "./DoctorType.sol";
import {HospitalType} from "./HospitalType.sol";
import {PatientType} from "./PatientType.sol";

//errors
error PatientMedicalRecords__NotOwner();
error PatientMedicalRecords__NotDoctor();
error PatientMedicalRecords__NotApproved();
error PatientMedicalRecords__NotPatient();

contract Medikai is ReentrancyGuard {
    //Type Declaration

    //Storage Variables
    mapping(address => PatientType.Patient) private s_patients;
    mapping(address => DoctorType.Doctor) private s_doctors;
    mapping(address => HospitalType.Hospital) private s_hospitals;
    mapping(address => string) private s_addressToPublicKey;

    address private immutable i_owner;

    //Events
    event AddedPatient(
        address indexed patientAddress,
        string name,
        string[] chronicHash,
        uint256 indexed dob,
        string bloodGroup,
        uint256 indexed dateOfRegistration,
        string publicKey,
        string[] vaccinationHash,
        string phoneNumber,
        string[] accidentHash,
        string[] acuteHash
    ); //added or modified

    event AddedPublicKey(address indexed patientAddress, string publicKey); //emitting when public key is added.

    event AddedDoctor(
        address indexed doctorAddress,
        string name,
        string doctorRegistrationId,
        uint256 indexed dateOfRegistration,
        string specialization,
        address indexed hospitalAddress
    ); //added or modified to the mapping
    event AddedHospital(
        address indexed hospitalAddress,
        string name,
        string hospitalRegistrationId,
        uint256 indexed dateOfRegistration,
        string email,
        string phoneNumber
    ); //added(mostly) or modified

    //modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert PatientMedicalRecords__NotOwner();
        }
        _;
    }

    modifier onlyDoctor(address senderAddress) {
        if (s_doctors[senderAddress].doctorAddress != senderAddress) {
            revert PatientMedicalRecords__NotDoctor();
        }
        _;
    }

    constructor() {
        i_owner = msg.sender;
    }

    //Functions
    //patients can themselves register to the system.
    function registerPatient(
        address _patientAddress,
        string memory _name,
        uint256 _dob,
        string memory _phoneNumber,
        string memory _bloodGroup,
        string memory _publicKey
    ) external nonReentrant {
        if (msg.sender != _patientAddress) {
            revert PatientMedicalRecords__NotPatient();
        }
        PatientType.Patient memory patient;
        patient.name = _name;
        patient.patientAddress = _patientAddress;
        patient.dob = _dob;
        patient.phoneNumber = _phoneNumber;
        patient.bloodGroup = _bloodGroup;
        patient.dateOfRegistration = block.timestamp;
        patient.publicKey = _publicKey; //public key is stored here.

        patient.vaccinationHash = new string[](0); //0
        patient.accidentHash = new string[](0); // 1
        patient.chronicHash = new string[](0); //2
        patient.acuteHash = new string[](0); //3

        s_patients[_patientAddress] = patient;
        s_addressToPublicKey[_patientAddress] = _publicKey;

        //emiting the events
        emit AddedPublicKey(_patientAddress, _publicKey);
        emit AddedPatient(
            _patientAddress,
            patient.name,
            patient.chronicHash,
            patient.dob,
            patient.bloodGroup,
            patient.dateOfRegistration,
            patient.publicKey,
            patient.vaccinationHash,
            patient.phoneNumber,
            patient.accidentHash,
            patient.acuteHash
        );
    }

    function addPatientDetails(
        address _patientAddress,
        uint16 _category,
        string memory _IpfsHash //This is the IPFS hash of the diagnostic report which contains an IPFS file hash (preferably PDF file)
    ) external onlyDoctor(msg.sender) nonReentrant {
        if (_category == 0) {
            s_patients[_patientAddress].vaccinationHash.push(_IpfsHash);
        } else if (_category == 1) {
            s_patients[_patientAddress].accidentHash.push(_IpfsHash);
        } else if (_category == 2) {
            s_patients[_patientAddress].chronicHash.push(_IpfsHash);
        } else if (_category == 3) {
            s_patients[_patientAddress].acuteHash.push(_IpfsHash);
        }
        PatientType.Patient memory patient = s_patients[_patientAddress];
        //emitting the event.
        emit AddedPatient(
            _patientAddress,
            patient.name,
            patient.chronicHash,
            patient.dob,
            patient.bloodGroup,
            patient.dateOfRegistration,
            patient.publicKey,
            patient.vaccinationHash,
            patient.phoneNumber,
            patient.accidentHash,
            patient.acuteHash
        );
    }

    //this will be done using script by the owner
    function addDoctorDetails(
        address _doctorAddress,
        string memory _name,
        string memory _doctorRegistrationId,
        uint256 _dateOfRegistration,
        string memory _specialization,
        address _hospitalAddress
    ) external onlyOwner nonReentrant {
        DoctorType.Doctor memory doctor;
        doctor.name = _name;
        doctor.doctorRegistrationId = _doctorRegistrationId;
        doctor.doctorAddress = _doctorAddress;
        doctor.dateOfRegistration = _dateOfRegistration;
        doctor.specialization = _specialization;
        doctor.hospitalAddress = _hospitalAddress;
        s_doctors[_doctorAddress] = doctor;
        //emitting the event.
        emit AddedDoctor(
            _doctorAddress,
            doctor.name,
            doctor.doctorRegistrationId,
            doctor.dateOfRegistration,
            doctor.specialization,
            doctor.hospitalAddress
        );
    }

    //this will be done using script by the owner
    function addHospitalDetails(
        address _hospitalAddress,
        string memory _name,
        string memory _hospitalRegistrationId,
        string memory _email,
        string memory _phoneNumber
    ) external onlyOwner nonReentrant {
        HospitalType.Hospital memory hospital = s_hospitals[_hospitalAddress];
        hospital.hospitalAddress = _hospitalAddress;
        hospital.name = _name;
        hospital.email = _email;
        hospital.phoneNumber = _phoneNumber;
        hospital.hospitalRegistrationId = _hospitalRegistrationId;
        hospital.dateOfRegistration = block.timestamp;
        s_hospitals[_hospitalAddress] = hospital;
        //emitting the event.
        emit AddedHospital(
            hospital.hospitalAddress,
            hospital.name,
            hospital.hospitalRegistrationId,
            hospital.dateOfRegistration,
            hospital.email,
            hospital.phoneNumber
        );
    }

    function getMyDetails() external view returns (PatientType.Patient memory) {
        return s_patients[msg.sender];
    }

    //authorized doctor viewing patient's records
    function getPatientDetails(address _patientAddress)
        external
        view
        returns (
            string memory,
            string memory,
            uint256
        )
    {
        return (
            s_patients[_patientAddress].name,
            s_patients[_patientAddress].publicKey,
            s_patients[_patientAddress].dateOfRegistration
        );
    }

    function getPublicKey(address _patientAddress) public view returns (string memory) {
        return s_addressToPublicKey[_patientAddress];
    }

    function getDoctorDetails(address _doctorAddress)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
            s_doctors[_doctorAddress].name,
            s_doctors[_doctorAddress].specialization,
            s_doctors[_doctorAddress].doctorRegistrationId,
            s_doctors[_doctorAddress].hospitalAddress
        );
    }

    function getHospitalDetails(address _hospitalAddress)
        external
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        return (
            s_hospitals[_hospitalAddress].name,
            s_hospitals[_hospitalAddress].hospitalRegistrationId,
            s_hospitals[_hospitalAddress].email
        );
    }

    function getOwner() external view returns (address) {
        return i_owner;
    }
}
