/* eslint-disable no-unused-vars */
import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    currentUser: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isLoading } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel(e) {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input disabled value={email} />
      </FormRow>
      <FormRow label="Full name">
        <Input
          disabled={isLoading}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isLoading}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isLoading}
          type="reset"
          variation="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
