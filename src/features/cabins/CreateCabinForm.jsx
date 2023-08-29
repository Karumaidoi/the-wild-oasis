/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import FormRow from "../../ui/FormRow";
import { useCreatCabin } from "./createCabin";
import { useEditCabin } from "./useEditCabin";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { createCabin, isLoading } = useCreatCabin();
  const { editCabin, isEditing } = useEditCabin();

  function submit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
          isEditing: isEditSession,
        },
        { onSuccess: () => reset() }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset(), onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(submit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" errMessage={errors?.name?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errMessage={errors?.maxCapacity?.message}
      >
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" errMessage={errors?.regularPrice?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" errMessage={errors?.discount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow label="Description" errMessage={errors?.description?.message}>
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" errMessage={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
