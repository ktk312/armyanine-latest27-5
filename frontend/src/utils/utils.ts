export const formatDate = (dateString: string | Date) => {
    if (!dateString) return "";
  
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };