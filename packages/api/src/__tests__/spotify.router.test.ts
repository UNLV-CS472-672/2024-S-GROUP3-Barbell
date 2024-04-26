import { describe, expect, it } from 'vitest'

import { createCaller, RouterInputs } from '../..'
import { createContextInner } from '../trpc'

describe('SPOTIFY', async () => {
  const ctx = await createContextInner()
  const caller = createCaller(ctx)

  const input: RouterInputs['spotify']['createSpotifyData'] = {
    isPlaying: true,
    userID: 1,
    albumImageURL: 'albumImageURL',
    albumName: 'albumName',
    artist: 'artist',
    artistURL: 'artistURL',
    songURL: 'songURL',
    timePlayed: 1,
    timeTotal: 1,
    title: 'title',
  }

  const update: RouterInputs['spotify']['updateSpotifyData'] = {
    userID: 1,
    albumImageURL: 'albumImageURL',
    albumName: 'albumName',
    artist: 'artist',
    artistURL: 'artistURL',
    id: 1,
    isPlaying: true,
    songURL: 'songURL',
    timePlayed: 1,
    timeTotal: 1,
    title: 'title',
  }

  it('/getSpotifyDataFromUserId', async () => {
    const create = await caller.spotify.getSpotifyDataFromUserId({ id: 1 })
    expect(create).toBeDefined()
  })

  it('/createSpotifyData', async () => {
    await caller.spotify.deleteSpotifyDataFromUserId({ id: 1 })

    const create = await caller.spotify.createSpotifyData(input)
    expect(create).toBeDefined()

    // clean up
    await caller.spotify.deleteSpotifyDataFromUserId({ id: 1 })
  })

  it('/updateSpotifyData', async () => {
    await caller.spotify.deleteSpotifyDataFromUserId({ id: 1 })

    const create = await caller.spotify.createSpotifyData(input)
    expect(create).toBeDefined()

    const updated = await caller.spotify.updateSpotifyData(update)
    expect(updated).toBeDefined()

    // clean up
    await caller.spotify.deleteSpotifyDataFromUserId({ id: 1 })
  })


})
