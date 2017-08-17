// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json';
import propertyowners_artifacts from '../../build/contracts/PropertyOwners.json';
import marketplace_artifacts from '../../build/contracts/Marketplace.json';

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var PropertyOwners = contract(propertyowners_artifacts);
var Marketplace = contract(marketplace_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
      try {
          MetaCoin.setProvider(web3.currentProvider);
      } catch (err) {
          document.getElementById("signupbox").style.display = "none";
          document.getElementById("notloggedin").style.display = "inline";
          return;
      }
    PropertyOwners.setProvider(web3.currentProvider);
    Marketplace.setProvider(web3.currentProvider);
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        document.getElementById("signupbox").style.display = "none";
        document.getElementById("notloggedin").style.display = "inline";
          alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
          document.getElementById("signupbox").style.display = "none";
          document.getElementById("notloggedin").style.display = "inline";
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

    })
  },
  doNothing: function() {
    var self = this;

    Marketplace.deployed().then(function(instance) {
      var meta = instance;
      console.log(meta.ReturnString({from: account}));
    }).catch(function(e) {
      console.log(e);
    });
  },

  setRegister: function() {
      var self = this;

      Marketplace.deployed().then(function(instance) {
        var meta = instance;
        console.log(meta.SetOwnersRegister('0xf85b80e2d5b6becb6bf266095efff9ba6bb98a69',{from: account}));
      }).catch(function(e) {
        console.log(e);
      });
    },

  putOnSale: function() {
    var self = this;

    Marketplace.deployed().then(function(instance) {
      var meta = instance;
      meta.PutOnSale(0,100,{from: account});
    }).catch(function(e) {
      console.log(e);
    });
  },

  AddProperty: function() {

    var self = this;

    PropertyOwners.deployed().then(function(instance) {
      var meta = instance;
      meta.AddProperty({from: account});
    }).catch(function(e) {
      console.log(e);
    });
  },


  GetPrice: function(id) {
    Marketplace.deployed().then(function(instance) {
      var meta = instance;
      return meta.getPrice(id,{from: account})
    }).then(function(a) {return parseInt(a); })
  },

  GetAllProperties: function() {

    var nbOfProperties;
    var properties = [];
    var i;

    Marketplace.deployed().then(function(instance) {
      var meta = instance;
      return meta.getNbOfProperties({from: account})
    }).then(function(ret) {
        nbOfProperties = parseInt(ret);
      }).then( function() {
        for(i = 0; i < nbOfProperties ; i++) {
          properties.append({'id': i, 'price': 100});
        }
      }
      );

    return properties;
  },


  GetOwner: function() {
    var data = document.getElementById("receiver").value;

    window.alert(data)
    var self = this;

    PropertyOwners.deployed().then(function(instance) {
      var meta = instance;
      meta.GetOwner({from: account}).then(console.log);
    });
  },

  GetPropertyOwnersAddress: function() {

    var self = this;

    PropertyOwners.deployed().then(function(instance) {
      var meta = instance;
      return meta.getContractAddress({from: account});
    }).then(function(a) {
        var address = document.getElementById("addresspo");
        address.innerHTML = a.valueOf();
     });

    Marketplace.deployed().then(function(instance) {
       var meta = instance;
       return meta.getContractAddress({from: account});
     }).then(function(a) {
         var address = document.getElementById("addressm");
         address.innerHTML = a.valueOf();
      });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
      console.log("PROVIDER; ")
      console.log(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
