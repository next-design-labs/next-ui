import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import type { ExtractorContext } from "@unocss/core";

export default {
  name: 'dynamic-classes-extractor',
  extract({ id, code }: ExtractorContext) {
    // Process only files that end with `Button.tsx`
    if (!id?.endsWith("Button.tsx")) {
      return [];
    }

    // Parse the source code to extract variable values
    const variableContext = extractVariableValuesFromCode(code);

    // Regex to match dynamic template strings like `bg-${color}`
    const regex = /bg-\$\{([^}]+)\}/g;
    const extractedMatches: string[] = [];
    let match: RegExpExecArray | null;

    // Assign match before entering the loop
    match = regex.exec(code);

    // // Extract dynamic class patterns from the code
    // while (match !== null) {
    //   extractedMatches.push(match[0]); // Full match, e.g., `bg-${color}`
    //   match = regex.exec(code); // Re-assign in the next iteration
    // }

    // console.log("Found matches:", extractedMatches);

    // // If dynamic classes are found, evaluate them
    // if (extractedMatches.length > 0) {
    //   const generatedClasses = extractedMatches.map(match => {
    //     try {
    //       return evaluateTemplateString(match, variableContext);
    //     } catch (error) {
    //       console.error('Error evaluating template string:', match, error);
    //       return ''; // Return empty string in case of error
    //     }
    //   }).filter(Boolean); // Filter out any empty or invalid results

    //   console.log('Generated dynamic classes:', generatedClasses);
    //   return generatedClasses;
    // }

    // Return default color classes if no dynamic classes are found
    // return generateDefaultClasses();
  },
};

// Helper to evaluate the template string dynamically with a given context
const evaluateTemplateString = (template: string, context: Record<string, string>) => {
  return template.replace(/\$\{(\w+)\}/g, (_, variable) => {
    if (context[variable] !== undefined) {
      return context[variable];
    }
    throw new Error(`Context variable "${variable}" not found.`);
  });
}

// Helper to generate a default set of classes
const generateDefaultClasses = () => {
  const colors = ['primary', 'secondary', 'positive', 'warning', 'negative'];
  return colors.map(color => `bg-${color}`);
}

// Helper function to extract variable values from the source code using Babel
const extractVariableValuesFromCode = (code: string): Record<string, string> => {
  const variableContext: Record<string, string> = {};

  // Parse the code to get the AST (Abstract Syntax Tree)
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"], // Use these plugins for parsing JSX and TypeScript files
  });

  // Traverse the AST to find variable declarations
  traverse(ast, {
    VariableDeclarator(path) {
      const node = path.node;

      const variableName = node.id.name; // Get the variable name (e.g., color)
      console.log("🚀 ~ VariableDeclarator ~ variableName:", variableName)
      const variableValue = node.init.value; // Get the variable value (e.g., "primary")
      console.log("🚀 ~ VariableDeclarator ~ variableValue:", variableValue)

      // Check if the node is a variable declaration with an identifier and a string value
      if (
        node.id.type === "Identifier" &&
        node.init &&
        node.init.type === "StringLiteral"
      ) {
        const variableName = node.id.name; // Get the variable name (e.g., color)
        const variableValue = node.init.value; // Get the variable value (e.g., "primary")

        // Store the variable and its value in the context
        variableContext[variableName] = variableValue;
      }
    },
  });

  return variableContext;
};
