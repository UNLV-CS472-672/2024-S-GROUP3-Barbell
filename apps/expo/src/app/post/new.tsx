import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import Button from '~/components/ui/button/button'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

const inputStyles = {
  borderWidth: 1,
  borderColor: '#FFFFFF',
  borderRadius: 10,
  padding: 10,
  margin: 5,
  color: 'white',
  backgroundColor: '#1C1B1B',
  opacity: 0.9,
}

const NewPost = () => {
  const { userData } = useGlobalContext()
  const [content, setContent] = useState('')
  const { mutateAsync: createPost, error } = api.post.create.useMutation({
    async onSuccess() {
      alert('post created!')
      router.navigate('/')
    },
  })

  return (
    <SafeAreaView style={{ backgroundColor: '#1e1e1e', flex: 1 }} testID='new-post-container'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
        style={{ flex: 1 }}
      >
        <NavBar center='New Post' />
        <TextInput
          placeholder='write something!'
          placeholderTextColor='#CACACA'
          style={{ ...inputStyles, minHeight: 100 }}
          multiline={true}
          keyboardAppearance='dark'
          value={content}
          onChangeText={setContent}
          testID='new-post-content-input'
        ></TextInput>
        <Button
          value='Create'
          className='mx-2 my-4 p-4'
          onPress={() => createPost({ content, authorId: userData!.id })}
          testID='new-post-create-btn'
        ></Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NewPost
