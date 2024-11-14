export const formatPhoneNumber = (phone: string) => {
  const phoneNumber = phone.replace(/\D/g, "");
  return phoneNumber.length === 11
    ? `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
        2,
        7
      )}-${phoneNumber.slice(7)}`
    : phone;
};
