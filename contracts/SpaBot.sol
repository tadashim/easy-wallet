pragma solidity ^0.5.0;

contract SpaBot {
    struct Location {
        int256 longitude;
        int256 latitude;
    }

    mapping(string => Location) public locations;
    mapping(string => address payable) public addresses;

    event LocationRegistered(string name);
    event AddressRegistered(string userId, address userAddress);

    function registerLocation(string memory _name, int256 _longitude, int256 _latitude) public {
        locations[_name] = Location(_longitude, _latitude);
        emit LocationRegistered(_name);
    }

    function registerAddress(string memory _userId, address payable _userAddress) public {
        addresses[_userId] = _userAddress;
        emit AddressRegistered(_userId, _userAddress);
    }
}