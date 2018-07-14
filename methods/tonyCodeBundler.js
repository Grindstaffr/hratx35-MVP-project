module.exports.notPACK   = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000000'
    var arg1        = arg1.toString(2).padStart(8, '0')
    var arg2        = arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + arg1 + arg2 + address
    return packet;
};

module.exports.idPACK    = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000001'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};
module.exports.andPACK   = function (arg1, arg2, address) {
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '000000010'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.nandPACK  = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000011'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.orPACK    = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000100'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.norPACK   = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000101'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.xorPACK   = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000110'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.xnorPACK = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '00000111'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.leftPACK  = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '11111111'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
};

module.exports.rightPACK = function (arg1, arg2, address){
    var arg1    = arg1    || 0
    var arg2    = arg2    || 0
    var address = address || 0
    var instruction = '01111111'
    var argumentOne =  arg1.toString(2).padStart(8, '0')
    var arg2        =  arg2.toString(2).padStart(8, '0')
    var address     =  address.toString(2).padStart(8, '0')
    var packet = instruction + argumentOne + argumentTwo + address
    return packet;
}; 