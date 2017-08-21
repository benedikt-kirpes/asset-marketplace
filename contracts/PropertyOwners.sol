pragma solidity ^0.4.2;

contract PropertyOwners {

    mapping (uint => address) properties;
    uint nbOfProperties = 0;

    function propertyOwnersList() {
    }

    function getContractAddress() public constant returns (address) {
        return address(this);
    }

    function addProperty() {
        properties[nbOfProperties] = msg.sender;
        nbOfProperties = nbOfProperties+1;
    }

    function changeOwner(uint propId, address newOwner) {
        if (tx.origin == properties[propId]) {
            properties[propId] = newOwner;
        }
    }

    function getOwner(uint propId) public constant returns (address) {
      return properties[propId];
    }

    function getNumberOfProperties() public constant returns (uint) {
      return nbOfProperties;
    }

}
