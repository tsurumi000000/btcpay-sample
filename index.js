var grpc = require('grpc');
var fs = require("fs");
var lnrpc = grpc.load('assets/rpc.proto').lnrpc;
var macaroon = "0201036c6e6402bb01030a10bf897aaf70f45d97f304a7779ba502e71201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a0570656572731204726561641205777269746500000620ffe486c1f3ef247596c2083a0825f77825277a95da33c5c4b9b3e549e80d5145";
var sslCreds = grpc.credentials.createSsl();

var macaroonCreds = grpc.credentials.createFromMetadataGenerator(function (args, callback) {
    var metadata = new grpc.Metadata()
    metadata.add('macaroon', macaroon);
    callback(null, metadata);
});


var creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

var lightning = new lnrpc.Lightning("btcpaytest2.indiesquare.net", creds);


call = lightning.getInfo({}, function (err, response) {
    if (err != undefined) {
        console.error("error:" + err);


    }
    console.log('GetInfo: ', response);

})