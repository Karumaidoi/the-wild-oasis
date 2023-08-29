import Spinner from "./../../ui/Spinner";
import useSettings from "./useSettings";
// import { useUpdateSetting } from "features/settings/useUpdateSetting";

import Form from "./../../ui/Form";
import FormRow from "./../../ui/FormRow";
import Input from "./../../ui/Input";
import { useEditSetting } from "./useEditSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minimumBookingLength: minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  console.log(maxGuestPerBooking);
  const { editSetting, isEditing } = useEditSetting();
  console.log(isEditing);

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleBlur(e, field) {
    console.log(field, e.target.value);
    const { value } = e.target;

    if (!value) return;
    editSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, "minimumBookingLength")}
          disabled={isEditing}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
          disabled={isEditing}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleBlur(e, "maxGuestPerBooking")}
          disabled={isEditing}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isEditing}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
