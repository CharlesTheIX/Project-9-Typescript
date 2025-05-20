type FormError = {
  error: boolean;
  message: string;
};

const updateMessage = (message: string, update: string): string => {
  var newMessage = (message += message.length > 0 ? ", " : "");
  return (newMessage += update);
};

export default (requestData: Country): FormError => {
  const formError: FormError = {
    error: false,
    message: ""
  };

  Object.keys(requestData).map((item: string) => {
    switch (item) {
      case "displayName":
        // TODO: handle addition string validation here
        if (!requestData[item]) {
          formError.error = true;
          formError.message = updateMessage(formError.message, "Display Name");
        }
        break;
      case "names":
        // TODO: handle addition string and array validation here
        if (!requestData[item] || requestData[item].length === 0) {
          formError.error = true;
          formError.message = updateMessage(formError.message, "Names");
        }
        break;
      case "continent":
        // TODO: handle addition string and continent validation here
        if (!requestData[item]) {
          formError.error = true;
          formError.message = updateMessage(formError.message, "Continent");
        }
        break;
      case "flagRectangle":
        // There sould be no errors here and current if the Rectangle is a null rectangle that is fine
        break;
      case "mapRectangle":
        // There sould be no errors here and current if the Rectangle is a null rectangle that is fine
        break;
      case "image-url":
        // handle basic string validation here
        break;
    }
  });

  return formError;
};
