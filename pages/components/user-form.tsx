import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileFormSchema, ProfileFormValues } from '../../validator/profile';
import { saveUserData } from '../api';
import { useProfile } from '../hooks/use-profile';
import { FooterActions } from './footer-actions';
import ProfileFormField from './form-field';

function UserForm() {
  const {
    state: { userInfo, isEditing },
    dispatch,
  } = useProfile();
  const mode = isEditing ? 'edit' : 'view';

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    shouldUnregister: false,
    defaultValues: { username: '', email: '', phone: '' },
  });

  // when userInfo is updated, reset the form
  useEffect(() => {
    userInfo && form.reset(userInfo);
  }, [form, userInfo]);

  // handle form submission
  function onSubmit(values: ProfileFormValues) {
    dispatch(async (dispatch) => {
      dispatch({ type: 'SAVE_USER', meta: 'request' });

      try {
        const savedUser = await saveUserData(values);
        dispatch({ type: 'SAVE_USER', meta: 'success', payload: savedUser.user });
        dispatch({ type: 'TOGGLE_EDIT_MODE' });
        toast({ description: 'User data saved successfully' });
      } catch (error) {
        dispatch({ type: 'SAVE_USER', meta: 'failure', error: (error as Error).message });
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Failed to save user data. Please try again.',
        });
      }
    });
  }

  function onCancel() {
    userInfo && form.reset(userInfo);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ProfileFormField
          control={form.control}
          name="username"
          label="Username"
          placeholder="Please enter your username"
          description="This is your public display name."
          mode={mode}
        />
        <ProfileFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Please enter your email"
          description="This is your email address."
          mode={mode}
        />
        <ProfileFormField
          control={form.control}
          name="phone"
          label="Phone"
          placeholder="Please enter your phone number"
          description="This is your phone number."
          mode={mode}
        />
        <FooterActions onCancel={onCancel} />
      </form>
    </Form>
  );
}

export default UserForm;
