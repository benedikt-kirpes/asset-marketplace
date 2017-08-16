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
        if(tx.origin == properties[propId]) {
            properties[propId] = newOwner;
        }
    }

    function GetOwner(uint propId) public constant returns (address) {
      return properties[propId];
    }

    function GetNumberOfProperties() public constant returns (uint) {
      return nbOfProperties;
    }

}
