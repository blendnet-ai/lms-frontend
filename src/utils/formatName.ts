interface FormatOptions {
  firstNameOnly?: boolean;
  lastNameOnly?: boolean;
  upperCase?: boolean;
  lowerCase?: boolean;
  sentenceCase?: boolean;
  titileCase?: boolean;
}

const formatName = (
  name: string | null,
  options: FormatOptions = {}
): string => {
  try {
    const {
      firstNameOnly,
      lastNameOnly,
      upperCase,
      lowerCase,
      sentenceCase,
      titileCase,
    } = options;

    // Validate that name is provided
    if (!name) throw new Error("Name is required");

    // Validate that name is a string
    if (typeof name !== "string") {
      throw new Error("Name must be a string");
    }

    // Validate that the other parameters are numbers (0 or 1)
    if (
      [upperCase, lowerCase, sentenceCase, titileCase].filter(Boolean).length >
      1
    ) {
      throw new Error("Only one of the formatting options can be true");
    }

    if (!firstNameOnly && !lastNameOnly) {
      // Ensure at least one of first or last is true
      throw new Error("At least one of 'first' or 'last' must be true");
    }

    // Split the name into parts
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Determine the name to format based on first and last
    let formattedName = "";
    if (firstNameOnly && lastNameOnly) {
      formattedName = `${firstName} ${lastName}`;
    } else if (firstNameOnly) {
      formattedName = firstName;
    } else if (lastNameOnly) {
      formattedName = lastName;
    }

    // Apply the formatting
    if (upperCase) {
      formattedName = formattedName.toUpperCase();
    }
    if (lowerCase) {
      formattedName = formattedName.toLowerCase();
    }
    if (sentenceCase) {
      formattedName =
        formattedName.charAt(0).toUpperCase() +
        formattedName.slice(1).toLowerCase();
    }
    if (titileCase) {
      formattedName = formattedName
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    return formattedName;
  } catch (error) {
    console.error(error);
    return "Invalid Input";
  }
};

export default formatName;
