export async function deleteUser(id: string): Promise<void> {
  try {
  const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    console.log(`User mit ID ${id} erfolgreich gelöscht`);
  } else {
    console.error(`Löschen des Users mit der ID ${id} fehlgeschlagen`);
    throw new Error(`Failed to delete user with ID ${id}`);
  }
} catch (error) {
  console.error("Error deleting user:", error);
  throw error;
}
}