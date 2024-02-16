  export async function deleteTip(id: string): Promise<void> {
    try {
    const response = await fetch(`http://127.0.0.1:8000/api/tip/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      console.log(`Tip mit ID ${id} erfolgreich gelöscht`);
    } else {
      console.error(`Löschen des Tips mit der ID ${id} fehlgeschlagen`);
      throw new Error(`Failed to delete tip with ID ${id}`);
    }
  } catch (error) {
    console.error("Error deleting tip:", error);
    throw error;
  }
}