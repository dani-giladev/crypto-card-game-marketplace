pragma solidity ^0.5;

import "./IERC721.sol";
import "./ERC165.sol";
import "./Address.sol";


contract ERC721 is IERC721, ERC165 {

    using Address for address;


    /*** ERC721 IMPLEMENTATION ***/

    function totalSupply() public view returns (uint256) {

    }

    function balanceOf(address _owner) public view returns (uint256) {

    }

    function ownerOf(uint256 _tokenId) external view returns (address owner) {

    }

    function transfer(address _to, uint256 _tokenId) external {

    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {

    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable {

    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external payable {

    }

    function approve(address _to, uint256 _tokenId) external payable {

    }

    function setApprovalForAll(address _operator, bool _approved) external {

    }

    function getApproved(uint256 _tokenId) external view returns (address) {

    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {

    }


    /*** INTERNAL FUNCTIONS ***/




    /*** OTHER EXTERNAL FUNCTIONS ***/

    function _checkOnERC721Received(address to) public view returns (bool) {
        if (!to.isContract()) {
            return true;
        }

        bool retval = ERC165(to).supportsInterface(InterfaceID_ERC721);
        return retval;
    }


}
