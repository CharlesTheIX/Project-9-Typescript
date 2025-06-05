export default (message: string, update: string): string => {
  var newMessage = (message += message.length > 0 ? ", " : "");
  return (newMessage += update);
};
