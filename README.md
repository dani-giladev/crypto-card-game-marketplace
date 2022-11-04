# Crypto Card Game Marketplace, CCG


# INTRODUCTION

The table collectible card games (Trading Card Game, also abbreviated TCG) are a type of non-predefined card game and existing in great quantity and of varied types and characteristics, which give individuality to each card, and with which it can be built. a deck (or deck) depending on the rules of the game in question. Among the best-known franchises of this type are Magic: The Gathering.

The CCG (Crypto Card Game), in the same way, are also the same as the TCG, but the latter have a twist on the blockchain. Players are the sole owners of the cards, non-fungible tokens (ERC721) NFTs, which they accumulate. Each card is unique and unrepeatable and these can be bought, sold and exchanged in order to build a powerful deck.

## Objectives

The objective of this project is to develop the bases of a marketplace (platform) where users can acquire (be owners), view, transfer the cards (NFTs) to other users and put them up for sale so that other users can buy. All this on the Ethereum blockchain.

This project will complete PHASE 1, where in PHASE 2 (outside the scope of this project) a deck configuration system and a gameplay engine would be introduced, which due to agility and costs would most likely be developed outside the blockchain.

### Smart contracts:

- Methodology for the creation of letters. Each letter will be unique and unrepeatable, each one of them will be an ERC721 token. We will assign a series of properties to each card, such as the type of card, color, mana, attack, defense, price, activated/deactivated, image hash, etc.
- Methods to buy cards (NFT tokens) and transfer them to another user/player.
- Implement the logic so that the user can sell their cards. 

We will publish all contracts on the Ethereum ropsten testnet. 
 
We will develop a dApp to be able to:

- Create the cards. We will assign a series of properties to each card, in addition to a hash referenced to an image. This image will be hosted on IPFS.
- Visualize the letters that we can buy and an option to be able to buy them.
- Visualize the purchase of cards (owned).
- Transfer a letter to another user.
- Put a card up for sale and be able to undo this operation.

We will develop the dApp for 2 platforms: web and mobile. We will create a demo apk for android.

### Technologies:
- Solidity (SC)
- Remix
- Truffle
- Ganache
- IPFS
- Ionic/Angular
- Javascript and HTML
- Android
- Ethereum Testnet: Ropsten
