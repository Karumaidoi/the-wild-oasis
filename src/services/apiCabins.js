import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: Cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return Cabins;
}

export async function addCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("Cabins");

  //1. Create the Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2 Edit Cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  //2. Upload Image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete Cabin if there was an error uploading the current image
  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw Error("Cabin Image could not be created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
