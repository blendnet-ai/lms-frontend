const formatName = (
  name: string | null,
  first: boolean = false,
  last: boolean = false,
  u: 0 | 1 = 0,
  l: 0 | 1 = 0,
  s: 0 | 1 = 0,
  t: 0 | 1 = 0
): string => {
  // Validate that name is provided
  if (!name) throw new Error("Name is required");

  // Validate that name is a string
  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }

  // Validate that the other parameters are numbers (0 or 1)
  [u, l, s, t].forEach((param) => {
    if (typeof param !== "number" || ![0, 1].includes(param)) {
      throw new Error(
        "Invalid input: parameters 'u', 'l', 's', 't' must be 0 or 1"
      );
    }
  });

  // Ensure at least one of first or last is true
  if (!first && !last) {
    throw new Error("At least one of 'first' or 'last' must be true");
  }

  // Validate that only one of the formatting options is true
  if (u + l + s + t > 1) {
    throw new Error("Only one of the formatting options can be true");
  }

  // Split the name into parts
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Determine the name to format based on first and last
  let formattedName = "";
  if (first && last) {
    formattedName = `${firstName} ${lastName}`;
  } else if (first) {
    formattedName = firstName;
  } else if (last) {
    formattedName = lastName;
  }

  // Apply the formatting
  if (u) {
    formattedName = formattedName.toUpperCase();
  }
  if (l) {
    formattedName = formattedName.toLowerCase();
  }
  if (s) {
    formattedName =
      formattedName.charAt(0).toUpperCase() +
      formattedName.slice(1).toLowerCase();
  }
  if (t) {
    formattedName = formattedName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return formattedName;
};

export default formatName;
