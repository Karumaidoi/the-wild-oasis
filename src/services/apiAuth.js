import supabase from "./supabase";

export async function logIn({ email, password }) {
  console.log(email, password);
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error("Unable to login");
  }

  console.log(data);

  return data;
}
