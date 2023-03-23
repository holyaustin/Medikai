// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.17;


library PatientType {
    //Type Declaration
    struct Patient {
        string name;        //   
        address patientAddress; //account address of patient     
        uint256 dob;      //
        string phoneNumber;
        string bloodGroup;     //
        string publicKey;      //for storing public key for encrypting the data
        uint256 dateOfRegistration; //the date of registration of patient to the system. Tells which records are not in the system.
        //Medical Records
        string[] vaccinationHash; //0
        string[] accidentHash; // 1
        string[] chronicHash; //2
        string[] acuteHash; //3
    }
}

