pragma solidity ^0.5;


//import "./Dummy.sol";
import "./ERC721.sol";

contract  CCGMarketplace is ERC721 {

    string public constant name = "CCGMarketplace";
    string public constant symbol = "CCG";


    /*** DATA TYPES ***/

    struct Token {
        address mintedBy;
        uint64 mintedAt;
        string name;
        string description;
        uint8 color;
        uint8 cardType;
        uint8 mana;
        uint8 attack;
        uint8 guard;
        uint256 price;
        string imgHash;
        bool available;
        bool onSale;
    }


    /*** STORAGE ***/

    address payable public owner; // address used to set admins and withdraw balance
    mapping(address => bool) public adminByAddress;

    uint public balance;

    Token[] tokens;
    mapping(uint256 => address) public tokenIdOwnershipOf;
    mapping (address => uint256) public ownershipTokenCount;
    uint256[] public tokensIdOnSale;
    mapping(address => uint256[]) public tokensIdByAddress;


    /*** EVENTS ***/

    event newAdmin(address admin);
    event Mint(address owner, uint256 tokenId);
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    /*** CONSTRUCTOR & MODIFIERS ***/

    constructor() public {
        owner = msg.sender;
        addAdmin(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Only admin");
        _;
    }


    /*** ADMIN FUNCTIONS ***/

    function addAdmin(address userAddress) public onlyOwner {
        require(userAddress != address(0x0) && !adminByAddress[userAddress]);
        adminByAddress[userAddress] = true;
        emit newAdmin(userAddress);
    }

    function isAdmin(address userAddress) public view returns (bool) {
        return adminByAddress[userAddress];
    }

    //fallback function
    function () payable external {
        balance += msg.value;
    }

   function withdrawBalance(uint _amount) public onlyOwner {
       require(balance >= _amount, "No hay suficiente balance");
       balance -= _amount;
       owner.transfer(_amount);
   }


    /*** GETTERS ***/

	function getTokensIdOnSale() public view returns (uint256[] memory) {

        uint256[] memory ret  = new uint256[](tokensIdOnSale.length);

        for(uint i = 0; i < tokensIdOnSale.length; i++) {
            ret[i] = tokensIdOnSale[i];
        }

        return ret;
	}

	function getMyTokensId() public view returns (uint256[] memory) {

        uint256[] memory ret  = new uint256[](tokensIdByAddress[msg.sender].length);

        for(uint i = 0; i < tokensIdByAddress[msg.sender].length; i++) {
            ret[i] = tokensIdByAddress[msg.sender][i];
        }

        return ret;
	}

    function getToken(uint256 _tokenId) public view returns(
        string memory,  // name
        string memory,  // description
        uint8,  // color
        uint8,  // cardType
        uint8,  // mana
        uint8,  // attack
        uint8,  // guard
        uint256,  // price
        string memory,  // imgHash
        bool, // available
        bool // onSale
    ) {
        Token storage tk = tokens[_tokenId];
        return (tk.name, tk.description, tk.color, tk.cardType, tk.mana, tk.attack, tk.guard, tk.price, tk.imgHash, tk.available, tk.onSale);
    }


    /*** SETTERS ***/

    function mint(string memory _name, string memory _description, uint8 _color, uint8 _cardType, uint8 _mana, uint8 _attack, uint8 _guard, uint256 _price, string memory _imgHash) public onlyAdmin returns (uint256 tokenId) {
        Token memory token = Token({
          mintedBy: msg.sender,
          mintedAt: uint64(now),
          name: _name,
          description: _description,
          color: _color,
          cardType: _cardType,
          mana: _mana,
          attack: _attack,
          guard: _guard,
          price: _price,
          imgHash: _imgHash,
          available: true,
          onSale: true
        });

        tokenId = tokens.push(token) - 1;

        // Set owner
        tokenIdOwnershipOf[tokenId] = owner;
        ownershipTokenCount[owner]++;
        // Add token to owner
        tokensIdByAddress[owner].push(tokenId);
        // Add token on sale
        tokensIdOnSale.push(tokenId);

        emit Mint(owner, tokenId);
    }

    function setAvailable(uint256 _tokenId, bool _value) public onlyAdmin {
        require(tokens.length > _tokenId, "Token inexistente");
        Token storage tk = tokens[_tokenId];
        require(tk.onSale, "Token tiene propietario");
        tk.available = _value;
    }

    function buyToken(uint256 _tokenId) public payable  {
        require(tokens.length > _tokenId, "Token inexistente");
        require(!_owns(msg.sender, _tokenId), "Ya es el propietario del token");

        Token storage tk = tokens[_tokenId];

        require(tk.available, "Token no disponible o no activado");
        require(tk.onSale, "Token no está en venta");
        require(msg.value == tk.price, "Precio incorrecto");

        address payable oldOwner = address(uint160(tokenIdOwnershipOf[_tokenId]));

        _transfer(tokenIdOwnershipOf[_tokenId], msg.sender, _tokenId);

        // Remove token on sale
        tk.onSale = false;
        removeTokenOnSale(_tokenId);

        oldOwner.transfer(msg.value);
    }

    function transfer(address _to, uint256 _tokenId) public {
        require(_to != address(0x0), "El destino no puede ser la dirección 0x0");
        require(_to != address(this), "El destino no puede ser la dirección del contrato");
        require(_owns(msg.sender, _tokenId), "No es el propietario del token");

        _transfer(msg.sender, _to, _tokenId);

        // Remove token on sale
        Token storage tk = tokens[_tokenId];
        if (tk.onSale) {
            tk.onSale = false;
            removeTokenOnSale(_tokenId);
        }
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {

        // Add token
        ownershipTokenCount[_to]++;
        tokenIdOwnershipOf[_tokenId] = _to;
        tokensIdByAddress[_to].push(_tokenId);

        // Remove token
        removeTokenByAddress(_from, _tokenId);
        ownershipTokenCount[_from]--;

        emit Transfer(_from, _to, _tokenId);
    }

    function setTokenOnSale(uint256 _tokenId, uint256 _price, bool _onSale) public {
        require(tokens.length > _tokenId, "Token inexistente");
        require(_owns(msg.sender, _tokenId), "No es el propietario del token");
        require(_price > 0, "Precio no puede ser 0");

        Token storage tk = tokens[_tokenId];
        if (_onSale)
          require(!tk.onSale, "El token ya está en venta");
        else
          require(tk.onSale, "El token ya no está en venta");

        tk.price = _price;
        tk.onSale = _onSale;
        if (_onSale)
            tokensIdOnSale.push(_tokenId);
        else
            removeTokenOnSale(_tokenId);
    }


    /*** INTERNAL IMPLEMENTATION ***/

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return tokenIdOwnershipOf[_tokenId] == _claimant;
    }

	function removeTokenOnSale(uint256 _tokenId) private {

	    uint256[] memory newTokenstOnSale  = new uint256[](tokensIdOnSale.length - 1);

	    bool matched = false;
        for(uint i = 0; i < tokensIdOnSale.length; i++) {
            if (_tokenId != tokensIdOnSale[i])
                newTokenstOnSale[i] = tokensIdOnSale[i];
            else
                matched = true;
        }

        if (matched)
            tokensIdOnSale = newTokenstOnSale;
	}

	function removeTokenByAddress(address _address, uint256 _tokenId) private {

        if (tokensIdByAddress[_address].length <= 1) {
            delete tokensIdByAddress[_address];
        }
        else {
	        uint256[] memory newTokens  = new uint256[](tokensIdByAddress[_address].length - 1);

    	    bool matched = false;
            for(uint i = 0; i < tokensIdByAddress[_address].length; i++) {
                if (_tokenId != tokensIdByAddress[_address][i])
                    newTokens[i] = tokensIdByAddress[_address][i];
                else
                    matched = true;
            }

            if (matched)
                tokensIdByAddress[_address] = newTokens;
        }
	}


    /*** ERC721 IMPLEMENTATION ***/

    function totalSupply() public view returns (uint256) {
        return tokens.length;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return ownershipTokenCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address owner) {
        owner = tokenIdOwnershipOf[_tokenId];
    }


}
