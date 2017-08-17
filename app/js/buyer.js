// BUYER PAGE LOAD

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

    /* Get iframe src attribute value i.e. YouTube video url
  and store it in a variable */
    var url = $("#cartoonVideo").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', url);
    });

  // compile template
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);

    // image list
    var buildings = [
        'http://www.rob.dk/bolig/bolig2.jpg',
        'http://www.juss.info/wp-content/uploads/2013/10/eierskifteforsikring.jpg',
        'https://img.borsen.dk/img/cms/tuksi4/media/nyheder/16_9_large/79/121379phori_4248_1.jpg',
        'http://www.groovesmag.com/wp-content/uploads/2017/01/bo.jpg',
        'http://blabolig.no/files/large/d362a97ff132a9ef1ad1454afce4950b.jpg',
        'http://sparmere.dk/wp-content/uploads/2010/10/Bolig-Blogger.jpg',
        'http://www.iboligen.dk/s3/file.iboligen.dk/media/articles/100193/Kirke%20bolig-%20iBOLIGEN.DK%20high.jpg',
        'http://www.rob.dk/bolig/bolig1.jpg',
        'http://idealhuse.dk/wp-content/uploads/2017/04/Bolig-til-topkarakter-i-groenne-omgivelser-1.jpg',
        'http://www.hdbolig.dk/wp/wp-content/uploads/2015/12/hdbolig_slider1.jpg',
        'http://www.hdbolig.dk/wp/wp-content/uploads/2011/09/Lyngevej-43-11.jpg'
    ];

  App.GetAllProperties(function (data) {
      console.log(data);
      var entriesdiv = $("#entries");
        for(i=0; i<data.length;i++) {
            var j = i + 2;
            var context = {image: buildings[i], price: j*1500000, type: "Villa", city: "copenhagen", street: "Universitetsgade " + j, year: 1980 + j, size: "200", rooms: 2 + j, energyclass: "Class D"};
            var html    = template(context);
            entriesdiv.append(html);
        }
  });
  // // put dummy data into props
  //   properties.push(['test','haps']);
  //   properties.push(['8888','hasdf']);
  //   properties.push(['jfjfj','34erd']);
  // console.log(properties);
  //


});
