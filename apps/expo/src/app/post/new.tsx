import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '~/components/ui/button/button';
import { useGlobalContext } from '~/context/global-context';
import { api } from '~/utils/trpc/api';

const inputStyles = {
  borderWidth: 1,
  borderColor: '#FFFFFF',
  borderRadius: 20,
  padding: 10,
  margin: 5,
  color: 'white',
  backgroundColor: '#1C1B1B',
  opacity: 0.9,
};

const NewPost = () => {
  const { userData } = useGlobalContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutateAsync: createPost, error } = api.post.create.useMutation({
    async onSuccess() {
      alert('post created!');
      router.navigate('/');
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: '#1e1e1e', flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
        style={{ flex: 1 }}
      >
        <Text className="text-3xl text-slate-200 text-center mb-4">New Post</Text>
        <Text className='text-slate-200'>Title</Text>
        <TextInput
          style={inputStyles}
          keyboardAppearance='dark'
          value={title}
          onChangeText={setTitle}
        ></TextInput>
        <Text className='text-slate-200'>Content</Text>
        <TextInput
          style={{ ...inputStyles, minHeight: 100 }}
          multiline={true}
          keyboardAppearance='dark'
          value={content}
          onChangeText={setContent}
        ></TextInput>
        <Button
          value="Create"
          className="p-4 mx-2 my-4"
          onPress={() => createPost({ title, content, authorId: userData!.id })}
        ></Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NewPost;