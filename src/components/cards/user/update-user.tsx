export async function updateUser(id: string): Promise<void> {
  try {
    console.log("baseurl:", process.env.BASE_URL)
  const response = await fetch(`${process.env.BASE_URL}/api/user/${id}`, {
    method: 'PATCH',
  });

  if (response.ok) {
    console.log(`User mit ID ${id} erfolgreich updatet`);
  } else {
    console.error(`Updaten des Users mit der ID ${id} fehlgeschlagen`);
    throw new Error(`Failed to update user with ID ${id}`);
  }
} catch (error) {
  console.error("Error updating user:", error);
  throw error;
}
}