export const showMessage = (ref, sev, mess, dets) => {
  ref.current.show({ severity: sev, summary: mess, detail: dets });
};

export const showMultiple = (ref, messagesArray) => {
  ref.current.show(messagesArray);
};
