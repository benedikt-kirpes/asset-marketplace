pragma solidity ^0.4.2;

contract PropertyOwnersInterface {
    function GetOwner(uint propId) public constant returns (address) {}
    function ChangeOwner(uint propId, address newOwner) {}
}

contract Marketplace {

    address registerAddress;

    struct Property {
      address owner;
      uint price;
      bool sold;
      address buyer;
    }

    mapping (uint => Property) propertiesForSale;

    function Marketplace() {
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
        propertiesForSale[pid] = Property(msg.sender, price, false, msg.sender);
    }

    function Buying(uint pid) payable {
      uint price = propertiesForSale[pid].price;
      if(msg.value >= price) {
        propertiesForSale[pid].sold = true;
        propertiesForSale[pid].buyer = msg.sender;
      }
    }

    function SettleTransaction(uint pid) {
        address pad = p.GetOwner(pid);
        address buyer = propertiesForSale[pid].buyer;
        uint price = propertiesForSale[pid].price;
        if (msg.sender != pad || propertiesForSale[pid].sold == false) {
          throw;
        }
        msg.sender.transfer(price);
        PropertyOwnersInterface p = PropertyOwnersInterface(registerAddress);
        p.ChangeOwner(pid, buyer);
    }

}
