pragma solidity ^0.4.2;

contract PropertyOwners {

    mapping (uint => address) properties;
    uint nbOfProperties = 0;

    function PropertyOwners() {
    }

    function AddProperty() {
        properties[nbOfProperties] = msg.sender;
        nbOfProperties = nbOfProperties+1;
    }

    function ChangeOwner(uint propId, address newOwner) {
        if(msg.sender == properties[propId]) {
            properties[propId] = newOwner;
        }
    }

}
