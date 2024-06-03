const capitalizeFirstName = (fullName: string | null) => {
  if (!fullName) return "";

  const firstName = fullName.split(" ")[0];

  if (!firstName) return "";

  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};

export default capitalizeFirstName;
