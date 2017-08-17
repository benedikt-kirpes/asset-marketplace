pragma solidity ^0.4.2;

contract PropertyOwnersInterface {
    function GetOwner(uint propId) public constant returns (address) {}
    function ChangeOwner(uint propId, address newOwner) {}
}

contract Marketplace {

    address registerAddress;
    uint nbOfProperties;

    struct Property {
      address owner;
      uint price;
      bool sold;
      address buyer;
      uint legalid;
    }

    mapping (uint => Property) propertiesForSale;

    function Marketplace() {
    }

    // GETTERS

    function getContractAddress() public constant returns (address) {
        return address(this);
    }

    function getNbOfProperties() public constant returns (bytes32) {
      return bytes32(nbOfProperties);
    }

    function getOwner(uint pid) public constant returns (address) {
      return propertiesForSale[pid].owner;
    }

    function getPrice(uint pid) public constant returns (bytes32) {
      return bytes32(propertiesForSale[pid].price);
    }

    function SetOwnersRegister(address a) {
        registerAddress = a;
    }

    function PutOnSale(uint pid, uint price) {
        PropertyOwnersInterface p = PropertyOwnersInterface(registerAddress);
        address pad = p.GetOwner(pid);
        if (msg.sender != pad) {
          throw;
        }
        propertiesForSale[nbOfProperties] = Property(msg.sender, price, false, msg.sender, pid);
        nbOfProperties = nbOfProperties + 1;
    }

    function Buying(uint pid) payable {
      uint price = propertiesForSale[pid].price;
      if(msg.value >= price) {
        propertiesForSale[pid].sold = true;
        propertiesForSale[pid].buyer = msg.sender;
      }
    }

    function SettleTransaction(uint pid) {
        address buyer = propertiesForSale[pid].buyer;
        uint legalid = propertiesForSale[pid].legalid;
        uint price = propertiesForSale[pid].price;
        PropertyOwnersInterface p = PropertyOwnersInterface(registerAddress);
        address pad = p.GetOwner(legalid);
        if (msg.sender != pad || propertiesForSale[pid].sold == false) {
          throw;
        }
        msg.sender.transfer(price);
        p.ChangeOwner(legalid, buyer);
    }

}
