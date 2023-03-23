// SPDX-License-Identifier: GPL-3.0-only	

pragma solidity ^0.8.17;

library HospitalType{
    //Type Declaration

    struct Hospital{
        string name;
        address hospitalAddress; //account address of hospital
        uint256 dateOfRegistration;
        string hospitalRegistrationId;
        string email;
        string phoneNumber;
    }
}