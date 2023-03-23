// SPDX-License-Identifier: GPL-3.0-only	

pragma solidity ^0.8.17;


library DoctorType {
    //Type Declaration
    struct Doctor {
        address doctorAddress; //account address of doctor
        string name;
        string doctorRegistrationId; //NMC Regsitration Id
        uint256 dateOfRegistration;
        string specialization;
        address hospitalAddress;
    }
}