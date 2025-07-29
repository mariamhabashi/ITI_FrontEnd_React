//  =======================================================================================================
//    Task 1: Grade Analysis
//  =======================================================================================================

//  Approach:
//  This function analyzes a list of grades. It first checks for an empty list to prevent errors.
//  It then iterates through the grades in a single loop to calculate the sum, find the highest
//  and lowest values, and determine the letter grade for each score. After the loop, it
//  calculates the final average and an overall class status. All results are returned in
//  one comprehensive summary object.

function analyzeGrades(grades) {
  // Handle empty or non-existent grade list
  if (!grades || grades.length === 0) {
    return {
      average: 0,
      highest: 0,
      lowest: 0,
      passCount: 0,
      failCount: 0,
      letterGrades: [],
      status: "No grades provided",
    };
  }

  var sum = 0;
  var highest = grades[0]; // Start with the first grade to handle all cases
  var lowest = grades[0];
  var passCount = 0;
  var failCount = 0;
  var letterGrades = [];

  // Loop through each grade to perform calculations
  for (var i = 0; i < grades.length; i++) {
    var grade = grades[i];

    sum = sum + grade;

    if (grade > highest) {
      highest = grade;
    }
    if (grade < lowest) {
      lowest = grade;
    }

    // Assign letter grades and count pass/fail
    if (grade >= 90) {
      passCount++;
      letterGrades.push("A");
    } else if (grade >= 85) {
      passCount++;
      letterGrades.push("B+");
    } else if (grade >= 80) {
      passCount++;
      letterGrades.push("B");
    } else if (grade >= 75) {
      passCount++;
      letterGrades.push("C+");
    } else if (grade >= 70) {
      passCount++;
      letterGrades.push("C");
    } else if (grade >= 60) {
      passCount++;
      letterGrades.push("D");
    } else {
      failCount++;
      letterGrades.push("F");
    }
  }

  var average = sum / grades.length;
  var roundedAverage = Math.round(average * 10) / 10;

  var status = "";
  if (roundedAverage > 85) {
    status = "Above Average";
  } else if (roundedAverage >= 75) {
    status = "Average";
  } else {
    status = "Below Average";
  }

  return {
    average: roundedAverage,
    highest: highest,
    lowest: lowest,
    passCount: passCount,
    failCount: failCount,
    letterGrades: letterGrades,
    status: status,
  };
}
const testGrades = [88, 92, 76, 85, 90, 67, 95, 82, 78, 55];
console.log("Task 1: Grade Analysis");
console.log(analyzeGrades(testGrades));

// =======================================================================================================
//   Task 2: Text Processing
// =======================================================================================================
// Approach:
// This function modifies a text string based on a set of `options`. It sequentially checks
// each option (like `removeSpaces` or `reverseText`). If an option is `true`, the corresponding
// text manipulation is applied to a copy of the text. The function also keeps a list of
// which operations were performed and can extract data like numbers or vowel counts from the
// original text. The final result is an object containing the original text, the modified
// text, and the list of applied operations
function processText(text, options) {
  var originalText = text;
  var processedText = text;
  var appliedOperations = [];

  var result = {
    originalText: originalText,
    processedText: "",
    operations: appliedOperations,
  };

  if (options.removeSpaces) {
    var textWithoutSpaces = "";
    for (var i = 0; i < processedText.length; i++) {
      if (processedText[i] !== " ") {
        textWithoutSpaces += processedText[i];
      }
    }
    processedText = textWithoutSpaces;
    appliedOperations.push("removeSpaces");
  }

  if (options.capitalizeWords) {
    var words = processedText.split(" ");
    var capitalizedWords = [];
    for (var j = 0; j < words.length; j++) {
      var word = words[j];
      if (word.length > 0) {
        var capitalizedWord = word[0].toUpperCase() + word.slice(1);
        capitalizedWords.push(capitalizedWord);
      }
    }
    processedText = capitalizedWords.join(" ");
    appliedOperations.push("capitalizeWords");
  }

  if (options.reverseText) {
    var reversedText = "";
    for (var k = processedText.length - 1; k >= 0; k--) {
      reversedText += processedText[k];
    }
    processedText = reversedText;
    appliedOperations.push("reverseText");
  }

  // Extract numbers from the original text if requested
  if (options.extractNumbers) {
    var extractedNumbers = [];
    var currentNumberStr = "";
    for (var l = 0; l < originalText.length; l++) {
      var char = originalText[l];
      if (char >= "0" && char <= "9") {
        currentNumberStr += char;
      } else if (currentNumberStr.length > 0) {
        extractedNumbers.push(parseInt(currentNumberStr));
        currentNumberStr = "";
      }
    }
    if (currentNumberStr.length > 0) {
      extractedNumbers.push(parseInt(currentNumberStr));
    }
    result.extractedNumbers = extractedNumbers;
    appliedOperations.push("extractNumbers");
  }

  // Count vowels in the original text if requested
  if (options.countVowels) {
    var vowelCount = 0;
    var vowels = "aeiou";
    for (var m = 0; m < originalText.length; m++) {
      var lowerCaseChar = originalText[m].toLowerCase();
      if (vowels.indexOf(lowerCaseChar) > -1) {
        vowelCount++;
      }
    }
    result.vowelCount = vowelCount;
    appliedOperations.push("countVowels");
  }

  result.processedText = processedText;
  return result;
}

console.log("\nTask 2: Text Processing");
console.log(
  processText("Hello World 123!", {
    removeSpaces: true,
    capitalizeWords: true,
    extractNumbers: true,
    countVowels: true,
  })
);
console.log(
  processText("JavaScript is awesome 2024", {
    reverseText: true,
    countVowels: true,
  })
);

//  =======================================================================================================
//    Task 3: Shopping Cart Calculation
//  ======================================================================================================
// Approach:
// This function calculates the total for a shopping cart. It first loops through all items
// to find the subtotal, total item count, and unique categories. It then calculates all
// *possible* discounts the user might qualify for (e.g., for bulk orders or specific
// categories). After identifying the single best discount that provides the most savings,
// it applies it, calculates the tax, and returns a detailed summary of the cart.
function calculateCart(items) {
  if (!items || items.length === 0) {
    return {
      items: [],
      subtotal: 0,
      discountApplied: "None",
      discountAmount: 0,
      tax: 0,
      total: 0,
      itemCount: 0,
      categories: [],
      mostExpensiveItem: null,
    };
  }
  var subtotal = 0;
  var itemCount = 0;
  var uniqueCategories = {};
  var mostExpensiveItemName = items[0].name;
  var highestPrice = items[0].price;
  var processedItems = [];
  var electronicsSubtotal = 0; // for category-specific discounts

  // Loop through items to calculate subtotal and gather info
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemSubtotal = item.price * item.quantity;
    processedItems.push({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      subtotal: itemSubtotal,
    });
    subtotal += itemSubtotal;
    itemCount += item.quantity;
    uniqueCategories[item.category] = true;
    if (item.price > highestPrice) {
      highestPrice = item.price;
      mostExpensiveItemName = item.name;
    }
    if (item.category === "Electronics") {
      electronicsSubtotal += itemSubtotal;
    }
  }

  // Determine all possible discounts the user is eligible for
  var discounts = [];
  discounts.push({ name: "STUDENT10", amount: subtotal * 0.1 });
  discounts.push({ name: "ELECTRONICS20", amount: electronicsSubtotal * 0.2 });
  if (itemCount > 5) {
    discounts.push({ name: "BULK15", amount: subtotal * 0.15 });
  }
  if (subtotal > 200) {
    discounts.push({ name: "NEWUSER", amount: 50 });
  }

  // Find the single best discount from the available options
  var bestDiscount = { name: "None", amount: 0 };
  for (var j = 0; j < discounts.length; j++) {
    if (discounts[j].amount > bestDiscount.amount) {
      bestDiscount = discounts[j];
    }
  }

  // Apply the best discount and calculate final totals
  var discountAmount = bestDiscount.amount;
  var discountedSubtotal = subtotal - discountAmount;
  var tax = discountedSubtotal * 0.1;
  var total = discountedSubtotal + tax;

  // Helper function to round to 2 decimal places
  function round(num) {
    return Math.round(num * 100) / 100;
  }

  return {
    items: processedItems,
    subtotal: round(subtotal),
    discountApplied: bestDiscount.name,
    discountAmount: round(discountAmount),
    tax: round(tax),
    total: round(total),
    itemCount: itemCount,
    categories: Object.keys(uniqueCategories),
    mostExpensiveItem: mostExpensiveItemName,
  };
}

var myItems = [
  { name: "Laptop", price: 999.99, quantity: 1, category: "Electronics" },
  { name: "Mouse", price: 25.5, quantity: 2, category: "Electronics" },
  { name: "Book", price: 15.99, quantity: 3, category: "Books" },
];
console.log("\nTask 3: Shopping Cart Calculation");
console.log(calculateCart(myItems));

// =======================================================================================================
//   Task 4: User Data Validation
// =======================================================================================================
//Approach:
// This function validates a user's registration data against a series of rules. It systematically
//  checks each field, such as email format, password strength, and phone number structure. For
//  every validation failure, it records a specific error, adds a helpful suggestion, and
// subtracts points from a "quality score" that starts at 100. The function returns a
//comprehensive report including the validation status, a list of all errors, the final
// score, and suggestions for improvement.
function validateUserData(userData) {
  var errors = [];
  var uniqueSuggestions = {};
  var score = 100;

  var email = userData.email;
  var emailIsValid = true;
  if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    emailIsValid = false;
  } else {
    var domain = email.split("@")[1];
    if (
      !domain ||
      !(
        domain.endsWith(".com") ||
        domain.endsWith(".org") ||
        domain.endsWith(".net") ||
        domain.endsWith(".edu")
      )
    ) {
      emailIsValid = false;
    }
  }
  if (!emailIsValid) {
    errors.push({ field: "email", message: "Invalid email format" });
    uniqueSuggestions[
      "Provide a valid email ending in .com, .org, .net, or .edu."
    ] = true;
    score -= 15;
  }

  var password = userData.password;
  if (password !== userData.confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Passwords do not match",
    });
    score -= 20;
  } else {
    // Check for length, character types, and common weak passwords
    if (!password || password.length < 8) {
      errors.push({
        field: "password",
        message: "Password must be at least 8 characters",
      });
      score -= 5;
    }
    var hasUpper = /[A-Z]/.test(password);
    var hasLower = /[a-z]/.test(password);
    var hasNumber = /[0-9]/.test(password);
    var hasSpecial = /[!@#$%^&*()_+-=\[\]{}|;:,.<>?]/.test(password);
    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      if (!hasUpper) {
        errors.push({
          field: "password",
          message: "Password must contain an uppercase letter",
        });
        score -= 5;
      }
      if (!hasLower) {
        errors.push({
          field: "password",
          message: "Password must contain a lowercase letter",
        });
        score -= 5;
      }
      if (!hasNumber) {
        errors.push({
          field: "password",
          message: "Password must contain a number",
        });
        score -= 5;
      }
      if (!hasSpecial) {
        errors.push({
          field: "password",
          message: "Password must contain a special character",
        });
        score -= 5;
      }
      uniqueSuggestions[
        "Strengthen your password with a mix of character types."
      ] = true;
    }
    if (
      password &&
      ["password", "123456", "qwerty"].indexOf(password.toLowerCase()) !== -1
    ) {
      errors.push({ field: "password", message: "Password is too common" });
      score -= 10;
    }
  }

  // Validate phone using regular expressions for a cleaner check
  var phone = userData.phone;
  var phoneIsValid =
    /^\+1-[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone) ||
    /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/.test(phone);
  if (!phoneIsValid) {
    errors.push({
      field: "phone",
      message: "Invalid phone format. Use +1-XXX-XXX-XXXX or (XXX) XXX-XXXX",
    });
    score -= 15;
  }

  var age = userData.age;
  if (typeof age !== "number" || age < 13 || age > 120) {
    errors.push({
      field: "age",
      message: "Age must be a number between 13 and 120",
    });
    score -= 15;
  }

  var username = userData.username;
  if (!username || username.length < 3 || username.length > 20) {
    errors.push({
      field: "username",
      message: "Username must be 3-20 characters long",
    });
    score -= 10;
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    // Check for allowed characters: letters, numbers, and underscores only
    errors.push({
      field: "username",
      message: "Username must be alphanumeric with underscores only",
    });
    score -= 5;
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    score: Math.max(0, score), // prevent score from going below zero
    suggestions: Object.keys(uniqueSuggestions),
  };
}

console.log("\nTask 4: User Data Validation");
var validUser = {
  email: "testuser@example.com",
  password: "StrongPass123!",
  confirmPassword: "StrongPass123!",
  phone: "+1-555-123-4567",
  age: 30,
  username: "valid_user_1",
};
console.log("Valid User");
console.log(validateUserData(validUser));
var invalidUser = {
  email: "user@invalid",
  password: "weak",
  confirmPassword: "password",
  phone: "123-456-7890",
  age: 10,
  username: "bad!",
};
console.log("\nInvalid User");
console.log(validateUserData(invalidUser));

 //=======================================================================================================
//   Task 5: Data Set Analysis
// =======================================================================================================
// Approach:
// This function analyzes a diverse set of data in two main stages. First, it iterates
// through the entire dataset to categorize each item by its type (e.g., number, string),
// count truthy/falsy values, and identify all unique items. In the second stage, it
// processes these categorized groups to compute detailed statistics, such as the sum and
// average of numbers, and find the longest and shortest strings. The final output is a
// structured object containing a complete breakdown and analysis of the dataset.
function analyzeDataSet(dataSet) {
  var totalItems = dataSet.length;
  var dataTypes = {
    numbers: { count: 0, values: [] },
    strings: { count: 0, values: [] },
    booleans: { count: 0, values: [] },
    nullish: { count: 0, values: [] },
    other: { count: 0, values: [] },
  };
  var statistics = {
    numberSum: 0,
    averageNumber: 0,
    longestString: null,
    shortestString: null,
    truthyCount: 0,
    falsyCount: 0,
  };
  var processed = {
    numbersOnly: [],
    stringsOnly: [],
    uniqueValues: [],
    sortedNumbers: [],
  };

  if (totalItems === 0) {
    return {
      totalItems: 0,
      dataTypes: dataTypes,
      statistics: statistics,
      processed: processed,
    };
  }

  var uniqueSet = {}; // use an object for efficient unique value tracking

  // Loop through the data set to categorize and collect everything
  for (var i = 0; i < dataSet.length; i++) {
    var item = dataSet[i];
    var type = typeof item;

    // Categorize item by its type
    if (type === "number") dataTypes.numbers.values.push(item);
    else if (type === "string") dataTypes.strings.values.push(item);
    else if (type === "boolean") dataTypes.booleans.values.push(item);
    else if (item === null || type === "undefined")
      dataTypes.nullish.values.push(item);
    else dataTypes.other.values.push(item);

    // Count truthy vs. falsy values
    if (item) statistics.truthyCount++;
    else statistics.falsyCount++;

    // Track unique values (handles primitives, objects, and NaN)
    var key = type === "number" && isNaN(item) ? "NaN" : JSON.stringify(item);
    if (!uniqueSet[key]) {
      uniqueSet[key] = true;
      processed.uniqueValues.push(item);
    }
  }

  dataTypes.numbers.count = dataTypes.numbers.values.length;
  dataTypes.strings.count = dataTypes.strings.values.length;
  dataTypes.booleans.count = dataTypes.booleans.values.length;
  dataTypes.nullish.count = dataTypes.nullish.values.length;
  dataTypes.other.count = dataTypes.other.values.length;

  // Process numbers to get sum, average, and a sorted copy
  for (var k = 0; k < dataTypes.numbers.values.length; k++) {
    var num = dataTypes.numbers.values[k];
    if (!isNaN(num)) {
      processed.numbersOnly.push(num);
      statistics.numberSum += num;
    }
  }
  if (processed.numbersOnly.length > 0) {
    statistics.averageNumber =
      statistics.numberSum / processed.numbersOnly.length;
  }
  processed.sortedNumbers = processed.numbersOnly
    .slice(0)
    .sort(function (a, b) {
      return a - b;
    });

  // Process strings to find longest/shortest and create trimmed versions
  if (dataTypes.strings.values.length > 0) {
    statistics.longestString = dataTypes.strings.values[0];
    statistics.shortestString = dataTypes.strings.values[0];
    for (var l = 0; l < dataTypes.strings.values.length; l++) {
      var str = dataTypes.strings.values[l];
      if (str.length > statistics.longestString.length)
        statistics.longestString = str;
      if (str.length < statistics.shortestString.length)
        statistics.shortestString = str;
      processed.stringsOnly.push(str.trim());
    }
  }

  // Helper to round numbers for cleaner output
  function round(num) {
    return Math.round(num * 100) / 100;
  }
  statistics.numberSum = round(statistics.numberSum);
  statistics.averageNumber = round(statistics.averageNumber);

  return {
    totalItems: totalItems,
    dataTypes: dataTypes,
    statistics: statistics,
    processed: processed,
  };
}

console.log("\nTask 5: Data Set Analysis");
var testData1 = [
  1,
  "a",
  true,
  1,
  "a",
  false,
  null,
  2,
  "b",
  undefined,
  NaN,
  NaN,
  { a: 1 },
  { a: 1 },
];
console.log("Test Case 1");
console.log(analyzeDataSet(testData1));
