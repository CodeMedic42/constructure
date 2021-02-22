# Constructure

Constructure is a schema validation library where you are in control. Its main focus is to provide an interface where a developer can define a schema for a set of data and the logic needed to validate it. But more importantly to link and choreograph all the validation logic. If you have a validator which uses the value from somewhere else in the data you can do this. But if that value is valid you can block the validator from running until its required value is passing its validation.




### Install

 <span style="color:red"><strong>Not deployed yet.</strong></span>

```bash
npm install constucture --save
```




## Structure

Structure is the base and primary element in this library. Although creating your own structure is not difficult, we have some predefined ones for you.

It all starts from here

```js
import Constructure from 'constructure';
```

### String

This will validate that your value is a string.

```js
const structure = Structure.string();
```

### Number

This will validate that your value is a number.

```js
const structure = Structure.number();
```

### Boolean

This will validate that your value is a boolean.

```js
const structure = Structure.boolean();
```

### Array

This will validate that your value is a array.

```js
const structure = Structure.array();
```

### Object

This will validate that your value is a object.

```js
const structure = Structure.object();
```

### Date

This will validate that your value is a Date object.

```js
const structure = Structure.boolean();
```

### Shape

This will validate that your value is an object with the given properties. If your value as properties which do not match then they will be ignored, unless you set exact to true.

```js
const exact = false;

const structure = Structure.shape({
    yourPropertyName: Structure.string() // Any other structure can go here
    defineAnyPropertyNameYouWant: Structure.shape({}),  // Yep even another shape!
}, exact);
```

### Object Of

This will validate that your value is an object. Then for each property of the value it will run the given structure against them.

```js
const structure = Structure.objectOf(Structure.string()); // Here each property value of the the object must be a string.
const structure = Structure.objectOf(Structure.shape({})); // Here each property value of the the object must be an object with the given shape.
const structure = Structure.objectOf(Structure.objectOf(Structure.string())); // Here each property value of the the object must be an object where each object has properties of type string.
```

### Array Of

This will validate that your value is an array. Then for each item of the value it will run the given structure against them.

```js
const structure = Structure.arrayOf(Structure.string()); // Here each item value of the the array must be a string.
const structure = Structure.arrayOf(Structure.shape({})); // Here each item value of the the array must be an object with the given shape.
const structure = Structure.arrayOf(Structure.arrayOf(Structure.string())); // Here each item value of the the array must be an array where each item is of type string.
```

### Any

This won't validate that your value is anything in particular it. Anything will just pass.

```js
const structure = Structure.any();
```

### One Of Type

This will validate that your value is one of the provided structures.

```js
const structure = Structure.oneOfType([
    Structure.string(), // Value can be either a string, ...
    Structure.number(), // or a number, ...
    Structure.shape({}), // or a shape.
]);
```

### Lazy

This will validate that your value is the returned structure. This should be used if you have a cyclical structure.

__Note:__ Be aware that the validations for structures returned from the lazy callback will not be ran until a non-nil value is provided for the lazy structure.

```js
// Here is an example of a looping person object with person contacts.
const structure = Structure.shape({
    firstName: Structure.string(),
    lastName: Structure.string(),
    phoneNumber: Structure.string(),
    contacts: Structure.arrayOf(
        // We need to use the lazy callback here to get personStructure later after it has been instantiated.
        Structure.lazy(() => structure)
    )
});
```




## Attributes
The main draw of this library is its attribute system.

Attributes are keyed pieces of data which can be associated to each structure.

Defining attributes for a structure is as simple as ...

```js
structure.attributes({
    attA: Structure.attribute('test'),
    attB: Structure.attribute(42),
    attC: Structure.attribute(true),
})
```

Attributes can be applied to any structure and can be any value type.

A callback function can be provided by which the attribute value can be dynamically determined. The first argument to the callback function is the value which is being verified by the structure. The return value for this callback function will become the value for the attribute. This return value can also be a promise.

```js
structure.attributes({
    dynamicAtt: Structure.attribute((value) => {
        return value == null; // the value of the the dynamicAtt attribute will be a boolean value.
    }),
})
```





### Validation

Each attribute can also have validation logic associated with it. To do this each attribute has a method to set the validator logic.

#### Validator Logic
The first argument to this method must be a function, a callback. This is called to validate the attribute. There are two arguments passed to this callback, the value of the property and the value of the attribute. If the attribute was promise then the validator will not be called until that promise is resolved. The return value from this callback should be either null or a string. If null is returned then this means the validation is passing. Otherwise the string means it failed and the string provides a message indicating as to the reason for the failure.

#### Validator Result
The second and last argument for the validator is the result type. There are two types, 'fatal' and 'non-fatal'. A true value(default) means that if the validator logic returns a message then the result will be fatal. A false value means that it is not fatal.

```js
const validatorCallback = (value, attributeValue) => {
    return 'Message';
}

const isFatal = true;

structure.attributes({
    att: Structure.attribute('test').setValidator(validatorCallback, isFatal),
})
```

Getting the results from a validation will be discussed later in the Execution section.





### Requirements

Sometimes an attribute requires the value, or attribute value, of another property in the data. This is called a requirement. This enters into the more advanced part of this library but is also the most useful as well.

There are a few simple real world examples which we will get into later, but first let's just resolve the functionality.

#### Simple Internal requirement
```js
const structure = Structure.shape({
    propertyA = Structure.string()
        .attributes({
            attA: Structure.attribute
        }),
});

```



















The best example is a date range where two properties are dates in the form of strings. The first date must be less than the second. But it is also possible that one or both are invalid dates.

To solve this we are going to use everything that we have discussed so far.

```js
import Structure from 'constructure';

const structure  = Structure.shape({
    fromDate = Structure.string(),
    toDate = Structure.string(),
});
```

Let's begin with the basic structure. Next let's add some require






### Standard Attributes

There are also a number of pre-defined attributes. These can be found on the Attribute class. The actual name of the attribute that these can be placed on can be anything you want. Though for the sake of your own sanity we really recommend that you use the same name.

```js
import { Attribute } from 'constructure';
```

#### Required
This will define an attribute which has validation logic which will result in a fatal message indicating that the value is nil and should not be. This attribute can be used with any structure. The

```js
const structure = Structure.string().attributes({
    required: Attribute.required()
    requiredA: Attribute.required(false) // This will disable the validator, you would not do this
    requiredA: Attribute.required(() => false)) // AHH tou can dynamically control it now! You might do this. Just wait till you see
});
```

## Execution

Once you have a structure all you need to do to verify it is...

```js
const value = ??? // What are you gonna verify today?

const promise = structure.run(value)
    .then((result) => {
        // Thats right, we are asynchronous!
    });
```
