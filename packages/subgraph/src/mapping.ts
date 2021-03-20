import { Minted, PriceChanged } from "../generated/RadicalManager/RadicalManager"
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

  // Load an existing user
  let ownerString = event.params.owner.toHexString()
  let owner = User.load(ownerString)

  // Or create a new one
  if (!owner) {
    owner = new User(ownerString)
    owner.address = event.params.owner
  }

  // Update radical token
  radicalToken.owner = owner.id
  radicalToken.createdAt = event.block.timestamp
  radicalToken.price = event.params.price
  radicalToken.rate = event.params.rate
  radicalToken.patronageToken = tokenId

  // Update patronage token
  patronageToken.owner = owner.id
  patronageToken.createdAt = event.block.timestamp
  patronageToken.radicalToken = tokenId

  // Persist all entities
  owner.save()
  radicalToken.save()
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

  // Update the owner and persist the token
  radicalToken.owner = event.params.to.toHexString()
  radicalToken.save()
}

export function handlePatronageTokenTransfer(event: Transfer): void {
  // Load token
  let tokenId = event.params.tokenId.toHexString()
  let patronageToken = PatronageToken.load(tokenId)

  // Update the owner and persist the token
  patronageToken.owner = event.params.to.toHexString()
  patronageToken.save()
}
