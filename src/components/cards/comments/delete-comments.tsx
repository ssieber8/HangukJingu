export async function deleteComment(id: string): Promise<void> {
  try {
  const response = await fetch(`http://127.0.0.1:8000/api/comment/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  console.log("Delete RESPONSE:", response);

  if (response.ok) {
    console.log(`Comment mit ID ${id} erfolgreich gelöscht`);
  } else {
    console.error(`Löschen des Commentss mit der ID ${id} fehlgeschlagen`);
    throw new Error(`Failed to delete comment with ID ${id}`);
  }
} catch (error) {
  console.error("Error deleting comment:", error);
  throw error;
}
}





  