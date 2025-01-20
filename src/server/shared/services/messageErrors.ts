// Export the error message pattern for the provider
export const errorsProvider = {
  createMessage: (itemError: string) =>
    `Unexpected error while accessing the CRUD service to create a new ${itemError}.`,
  getMessage: (itemError: string) =>
    `Unexpected error while accessing the CRUD service to retrieve ${itemError} data.`,
  updateMessage: (itemError: string) =>
    `Unexpected error while accessing the CRUD service to update ${itemError}.`,
  deleteMessage: (itemError: string) =>
    `Unexpected error while accessing the CRUD service to delete ${itemError}.`,
};

// Export the error message pattern for the crudService
export const errorsCrudService = {
  createMessage: (itemError: string) =>
    `Failed to create a new ${itemError}: [Error details].`,
  getMessage: (itemError: string) =>
    `Failed to retrieve ${itemError} data: [Error details].`,
  updateMessage: (itemError: string) =>
    `Failed to update ${itemError}: [Error details].`,
  deleteMessage: (itemError: string) =>
    `Failed to delete ${itemError}: [Error details].`,
};
