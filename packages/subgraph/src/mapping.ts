import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Minted, PriceChanged, RentCollected, RentDeposited } from "../generated/RadicalManager/RadicalManager"
import { Transfer } from "../generated/RadicalToken/RadicalToken"
import { User, RadicalToken, PatronageToken } from "../generated/schema"

// Subgraph TODOs:
// - Track total patronage collected by a token
// - Track total patronage collected by a user
// - Track total patronage collected by a user
// - Track price history
// - Track total rent accruing

export function handleMinted(event: Minted): void {
  // Create new tokens
  let tokenId = event.params.tokenId.toHexString()
  let radicalToken = new RadicalToken(tokenId)
  let patronageToken = new PatronageToken(tokenId)

  let owner = loadOrCreateUser(event.params.owner)

  // Update radical token
  radicalToken.owner = owner.id
  radicalToken.tokenURI = event.params.radicalURI
  radicalToken.createdAt = event.block.timestamp
  radicalToken.price = event.params.price
  radicalToken.rate = event.params.rate
  radicalToken.patronageToken = tokenId

  // Update patronage token
  patronageToken.owner = owner.id
  patronageToken.totalPatronageCollected = BigInt.fromI32(0)
  patronageToken.tokenURI = event.params.patronageURI
  patronageToken.createdAt = event.block.timestamp

  // Persist all entities
  owner.save()
  radicalToken.save()
  patronageToken.save()
}

export function handleRentCollected(event: RentCollected): void {
  // Load token
  let tokenId = event.params.tokenId.toHexString()
  let patronageToken = PatronageToken.load(tokenId)

  patronageToken.totalPatronageCollected = patronageToken.totalPatronageCollected.plus(event.params.amount)

  patronageToken.save()
}

export function handlePriceChanged(event: PriceChanged): void {
  // Load token
  let tokenId = event.params.tokenId.toHexString()
  let radicalToken = RadicalToken.load(tokenId)

  // Update the price and persist the token
  radicalToken.price = event.params.newPrice
  radicalToken.save()
}

export function handleRadicalTokenTransfer(event: Transfer): void {
  // Load token
  let tokenId = event.params.tokenId.toHexString()
  let radicalToken = RadicalToken.load(tokenId)

  // If it doesn't exist yet, we're in the minting process
  if (!radicalToken) return

  let owner = loadOrCreateUser(event.params.to)

  // Update the owner and persist the token
  radicalToken.owner = owner.id
  radicalToken.save()
}

export function handlePatronageTokenTransfer(event: Transfer): void {
  // Load token
  let tokenId = event.params.tokenId.toHexString()
  let patronageToken = PatronageToken.load(tokenId)

  // If it doesn't exist yet, we're in the minting process
  if (!patronageToken) return

  let owner = loadOrCreateUser(event.params.to)

  // Update the owner and persist the token
  patronageToken.owner = owner.id
  patronageToken.save()
}


function loadOrCreateUser(address: Address): User {
  // Load an existing user
  let userString = address.toHexString()
  let user = User.load(userString)

  // Or create a new one
  if (!user) {
    user = new User(userString)
    user.address = address
  }

  return user as User
}
