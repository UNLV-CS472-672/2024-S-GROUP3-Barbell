import type { SpotifyUserData } from '~/components/spotify/spotifyToken'
import { getTrackData } from '~/components/spotify/spotifyToken'
import { api } from '~/utils/trpc/api'

const useUpdateSpotify = (userID: number) => {
  const { mutate: updateSpotifyDataAPI } = api.spotify.updateSpotifyData.useMutation({
    retry: false,
  })

  const utils = api.useUtils()

  const handleUpdateData = async () => {
    try {
      const returnedTrack: SpotifyUserData = await getTrackData()

      updateSpotifyDataAPI(
        {
          userID       : userID,
          albumImageURL: returnedTrack.albumImageURL,
          albumName    : returnedTrack.albumName,
          artist       : returnedTrack.artist,
          isPlaying    : returnedTrack.isPlaying,
          songURL      : returnedTrack.songURL,
          title        : returnedTrack.title,
          timePlayed   : returnedTrack.timePlayed,
          timeTotal    : returnedTrack.timeTotal,
          artistURL    : returnedTrack.artistURL,
        },
        {
          onSuccess: () => {
            console.log('Successfully updated data!')
            utils.spotify.getSpotifyDataFromUserId.invalidate({ id: userID })
          },
          onError: (error) => {
            console.error('Failed to update data:', error)
          },
        },
      )
    } catch (error: any) {
      console.error('Error during Spotify data update:', error.message)
    }
  }

  return { handleUpdateData }
}

export default useUpdateSpotify
