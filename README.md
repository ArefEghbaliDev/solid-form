<p align="center">
<img src="https://camo.githubusercontent.com/1f4ae89a24e455e903cb0060acac29f4c3c39d797e6839dc5b2f1adaa8950707/68747470733a2f2f6173736574732e736f6c69646a732e636f6d2f62616e6e65723f6261636b67726f756e643d74696c65732670726f6a6563743d4d616465253230696e253230536f6c6964" height="150">
</p>

<h1 align="center">
Solid Forms
</h1>
<p align="center">
A powerful and flexible form validation library for Solid.js applications that integrates seamlessly with the Zod schema validation library. This library simplifies form handling by providing easy-to-use hooks and components for validation, input change management, and form submission.
<p>

## ✨ Features

- Zod Integration: Leverage the powerful Zod schema validation library for comprehensive form validation.
- Easy to Use: Simple hooks and components to manage form state and validation with minimal boilerplate.
- Real-time Validation: Validate inputs on change to provide immediate feedback to users.
- Customizable: Easily extend and customize validation logic to fit your specific - requirements.
- TypeScript Support: Fully typed to provide an excellent development experience with TypeScript.
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  
- [Props](#props)

# Getting Started

## 📦 Installation

### Yarn

```bash
yarn add solid-form
```

### PNPM

```bash
pnpm add solid-form
```

### NPM

```bash
npm install solid-form --save
```

## Usage

### Create your schema with zod
you need to create a valid zod schema to pass it to the useForm hook
```jsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Invalid Password"),
});
```
### Import useForm hook from solid-form
pass the schema that you created to the schema prop of the hook and also you need to pass the type of the schema using `z.infer<typeof schema>` just like the example below.
then define the default values for your form fields in `defaultValues` props.

the hook returns the fields values: `fields`, field errors: `errors`, a submitForm function which you can pass to either the form `onSubmit` or to a button `onClick` and a `onInput` which you need to pass it to your input `onInput` event not `onChange` because Solidjs handles the input value change with onInput not onChange.
```jsx
import { useForm } from "solid-form";

  const { fields, errors, submitForm, onInput } = useForm<
    z.infer<typeof schema>
  >({
    schema: schema,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values.email, values.password);
    },
  });

```

### Use it on your inputs
**Note: as mentioned above, you need to pass the `onInput` function to the input onInput event not onChange event.**
```jsx
        <input
          type="password"
          name="password"
          onInput={onInput}
          value={fields.password}
        />
```

## Props

| Key     | Default     | Description                                                                                            |
| ------- | ----------- | ------------------------------------------------------------------------------------------------ |
| schema   | `required`    | a zod schema. |
| defaultValues  | `required`       | the default values for your form fields                                                                                                 |
| onSubmit | `optional` |       the function that runs on form submit if the form is valid                                                                                           |
| validateOnChange | `boolean(optional)` | validate the form on input value change. default is false                                                                             |
| validateOnBlur | `boolean(optional)` | validate the form on input blur. default is false                                                                             |

## API
| Field  | Type  | Description  |
| :------------ | :------------ | :------------ |
| fields  | `Object`  | the values of the fields defined in your schema  |
| errors  | `string or string[]`  | the errors for the fields defined in your schema. if you defined multiple errors for a field the returned type will be an array of strings |
| submitForm  | `Function`  | submits the form and does an form validation, you can pass this to your form `onSubmit` to submit the form on pressing `enter` or you can pass it to a button `onClick`  |
| isLoading  | `boolean`  | the loading state when the form is submitted  |
| onChange  | `Function`  | to handle the onInput event of a input  |
| onBlur  | `Function`  | to handle the onBlur event of a input, you have to pass this to your input if you want to pass the `validateOnBlur` prop  |
| setFieldValue  | `Function`  | Takes the field name that exists in your schema and a value and updates the value of that field  |
| setFieldError  | `Function`  | Takes the field name that exists in your schema and a error message and updates the error message of that field   |


## 📝 Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.

