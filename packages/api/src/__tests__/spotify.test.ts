import { expect, test } from '@jest/globals'

import { prisma } from '@acme/db'

/*  */
test('SPOTIFY /getSpotifyDataFromUserId', async () => {
  const spotify = await prisma.spotifyData.findFirst()
  expect(spotify).toBeDefined()
})

test('SPOTIFY /createSpotifyData', async () => {
  const spotify = await prisma.spotifyData.create({
    data: {
      albumImageURL: 'https://example.com',
      albumName: 'albumName',
      artist: 'artist',
      isPlaying: true,
      songURL: 'https://example.com',
      title: 'title',
      timePlayed: 0,
      timeTotal: 0,
      artistURL: 'https://example.com',
      userID: 1,
    },
  })
  expect(spotify).toBeDefined()
  expect(spotify.artist).toEqual('artist')
})

/*  */
test('SPOTIFY /updateSpotifyData', async () => {
  const spotify = await prisma.spotifyData.update({
    where: { userID: 1 },
    data: {
      albumImageURL: 'https://example.com',
      albumName: 'albumName',
      artist: 'artist',
      isPlaying: true,
      songURL: 'https://example.com',
      title: 'title',
      timePlayed: 0,
      timeTotal: 0,
      artistURL: 'https://example.com',
      userID: 1,
    },
  })
  expect(spotify).toBeDefined()
  expect(spotify.artist).toEqual('artist')
})

/*  */
test('SPOTIFY /deleteSpotifyData', async () => {
  const spotify = await prisma.spotifyData.delete({
    where: { userID: 1 },
  })
  expect(spotify).toBeDefined()
  expect(spotify.artist).toEqual('artist')
})
