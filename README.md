# Constructure

Constructure is a schema validation library where you are in control. Its main focus is to provide an interface where a developer can define a schema for a set of data and the logic needed to validate it. But more importantly to link and choreograph all the validation logic. If you have a validator which uses the value from somewhere else in the data you can do this. But if that value is not valid you can block the validator from running until its required value is passing its validation.

### Install

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

**Note:** Be aware that the validations for structures returned from the lazy callback will not be ran until a non-nil value is provided for the lazy structure.

```js
// Here is an example of a looping person object with person contacts.
const structure = Structure.shape({
  firstName: Structure.string().aspects({
    required: Aspect.require(),
  }),
  lastName: Structure.string(),
  phoneNumber: Structure.string(),
  contacts: Structure.arrayOf(
    // We need to use the lazy callback here to get personStructure later after it has been instantiated.
    Structure.lazy(() => structure)
  ),
});
```

## Aspects

The main draw of this library is its aspect system.

Aspects are keyed pieces of data which can be associated to each structure.

Defining aspects for a structure is as simple as ...

```js
structure
    .aspect('apsA', 'test')
    .aspect('apsB', 42)
    .aspect('apsB', true)
});
```

Aspects can be applied to any structure and can be any value type.

A callback function can be provided by which the aspect value can be dynamically determined. The first argument to the callback function is the value which is being verified by the structure. The return value for this callback function will become the value for the aspect. This return value can also be a promise.

```js
structure
    .aspect('dynamicAsp', (value) => {
        // the value of the the dynamicAsp aspect will be a boolean value.
        return value == null;
    })
});
```

### Validation

Each aspect can also have validation logic associated with it. To do this each aspect takes a third parameter for options. To apply validation to an aspect just use the validator option.

The validator option can take either a callback function or an object. The object allows you indicate if a failing validation results is fatal or not. The default for isFatal would be true.

```js
structure
    .aspect('aspA', true, {
        validator: () => {}
    })
    .aspect('aspB', true, {
        validator: {
            onValidate() => {},
            isFatal: false
        }
    })
});
```

#### **Validator Logic**

The validator must be a function. This is called to validate the aspect when needed.

If the aspect value resulted in a promise then the validator will not be called until that promise is resolved. 

There are three arguments passed to this callback...

1. The value of the property
2. The value of the aspect
3. Any defined requirements(Reviewed later)

If a string is returned from this callback then the validation is considered to be failing. If anything else is returned then is will be considered passing.

However a Promise can be returned which and the system will wait for this promise to resolve. But it the end the result of the promise will be treated the same as above.

#### **Validator Result**

If isFatal is provided and is not true then a failing validation will be marked as non-fatal. This could be useful a warning is needed rather than blocking error.

Getting the results from a validation will be discussed later in the Execution section.

### Requirements

Sometimes an aspect requires the value, or the aspect value, of another property in the data. This is called a requirement. This enters into the more advanced part of this library but is also the most useful as well.

There are a few simple real world examples which we will get into later, but first let's just resolve the functionality. When creating a new aspect the third options parameter will take a require property. This is just an array of strings, where each string is a command of what data to retrieve.

The results of the required data will be provided to both the attribute value callback, if it was provided as a function, and the validator callback if one was provided.

#### **Internal**

In this example we can see that one aspect of a structure can require the value of another aspect.

```js
const structure = Structure.shape({
  propertyA: Structure.string()
    .aspect('attA', 42)
    .aspect('attB', (value, requirements) => {}, {
        validator: (value, attributeValue, requirements) => {},
        require: [':attA'] // Note that there is a long hand version of this, '$this:attA'
      }
    ),
});
```

Multiple aspects can be chained like this. Here attC requires attB which in turn requires attA.

```js
const structure = Structure.shape({
  propertyA: Structure.string()
    .aspect('attA', 42)
    .aspect('attB', 'test', {
      require: [':attA']
    })
    .aspect('attC',true,{
      require: [':attB']
    })
  }),
});
```

#### **Children**

But what if you need something from somewhere else in the data? Well, we got ya covered!

Let's start with getting a child value. Here we will add the aspect to the shape. We will also make the overall structure a little deeper.

Then we will add an aspect to the root and then access the aspect value from a child property

```js
const structure = Structure.shape({
  levelA: Structure.shape({
    levelB: Structure.shape({
      propertyA: Structure.string()
        .aspect('attA', 42),
    }),
  }),
})
  // Here we will add an aspect to the root structure.
  .aspect('rootAttA',''test, {
    require: [
      // This will get the value from specified child.
      // Note that there is a long hand version of this, '$this.levelA.levelB.propertyA'
      'levelA.levelB.propertyA',
      // This will get the aspect value from specified child.
      // Note that there is a long hand version of this, '$this.levelA.levelB.propertyA:attA'
      'levelA.levelB.propertyA:attA',
    ]
  });
```

#### **Siblings**

Okay but what if you want to get a sibling value? Just use "$parent"! BAM!

```js
const structure = Structure.shape({
  propertyA: Structure.string()
    .aspect('attA', 42),
  propertyB: Structure.string()
    .aspect('attA', 'test', {
      require: ['$parent.propertyA:attA']
    }),
});
```

#### **Up the Tree**

Okay big shot how do I go up? Uh I just told you, $parent. Go as high as you want. If you go beyond root it will stop at root.

```js
const structure = Structure.shape({
  levelA: Structure.shape({
    propertyA: Structure.string()
      .aspect('attA', 42),
    levelB: Structure.shape({
      propertyA: Structure.string()
        .aspect('attA', 'test', {
          require: ['$parent.$parent.propertyA:attA']
        }),
    }),
  }),
});
```

#### **From the Top**

Ok what's the keyword for starting from root? Exactly!

```js
const structure = Structure.shape({
  levelA: Structure.shape({
    propertyA: Structure.string()
      .aspect('attA', 42),
    levelB: Structure.shape({
      propertyA: Structure.string()
        .aspect('attA', 'test', {
          require: ['$root.levelA.propertyA:attA']
        }),
    }),
  }),
});
```

#### **Arrays**

Nice but I have to pass through an array and going up through using parent seems, bleh. Yeah that was what I thought. Which is why I went ahead and added the ability for the system to keep track of the array each path to a value passes through. Then when starting at root just use $index to indicate that you want to use the index used by the path for the value which the attribute is attached to. EASY!

```js
const structure = Structure.shape({
  levelA: Structure.arrayOf(
    Structure.shape({
      propertyA: Structure.string(),
      levelB: Structure.shape({
        propertyA: Structure.string().aspects({
          attA: Aspect((value, requirements) => {}).setRequirements([
            '$root.levelA.$index.propertyA:attA',
          ]),
        }),
      }),
    })
  ),
});
```

#### **Putting it together**

This does not look particularly useful at the moment I am sure. But there are two parts I have not told you about yet, or at least in passing.

1. The validator logic ALSO gets these requirements. The validation callback gets these as a third argument.
2. If a required aspect is failing its validation or is blocked from running then the aspect requiring it will NOT be evaluated and is considered blocked. This is useful if you have a value which can be invalid in such a way that it cannot be used until it is valid. This means you can block the logic of one aspect until the other becomes valid! But it will only block if the validation is failing AND is marked fatal.

Let's do an example, which will be a date range where two properties are dates in the form of strings. The first date must be less than the second. But it is also possible that one or both are invalid dates.

To solve this we are going to use everything that we have discussed so far.

```js
import Structure, { Aspect } from 'constructure';
import { isNil, isNan } from 'lodash';

// This will create an aspect with a value of a Date object if the string value is not nil.
const validDateValue = (value) => !isNil(value) ? new Date(value) : null;
// Then if the aspect value is not nil it will try to get the Time
// If the time is a Nan value then that means that string value is not a valid date
// which will result in a fatally failing aspect for the given string value
const validDateValidator = (_, aspectValue) =>
  isNil(aspectValue) || !isNan(aspectValue.getTime()) 
    ? null 
    : 'Not a valid Date';

const isGreaterValidator = (_, _, requirements) => {
    const toDate = requirements[0];
    const fromDate = requirements[1];

    if (isNil(toDate) || fromDate < toDate) {
        return null;
    }

    return `Must be greater than ${fromDate}`;
}

const structure  = Structure.shape({
    fromDate: Structure.string()
      .aspect('isValidDate', validDateValue, {
        validator: validDateValidator
      })
    toDate: Structure.string()
      .aspect('isValidDate', validDateValue, {
        validator: validDateValidator
      })
      .aspect('isGreater', true, {
        validator: isGreaterValidator,
        require: ['$this:isValidDate', '$parent.fromDate:isValidDate']
      })
});
```

### Reusable Aspects

You can also create reusable Aspects. Be careful with specifying requirements. 

```js
import { Aspect } from 'constructure';

const aspect = Aspect(value, options);

const structure = Structure.shape({
  propertyA: Structure.string()
    .aspect('attA', aspect)
    .aspect('attB', aspect)
});
```

### Standard Aspects

There are also a number of pre-defined aspects. These can be found on the Aspect class. The actual name of the aspect that these can be placed on can be anything you want. Though for the sake of your own sanity we really recommend that you use the same name.

#### **Required**

This will define an aspect which has validation logic which will result in a fatal message indicating that the value is nil and should not be. This aspect can be used with any structure. The

```js
const structure = Structure.string()
  .aspect('required', Aspect.required())
  // This will disable the validator, you would not do this
  .aspect('requiredA', Aspect.required(false))
  // AHH you can dynamically control it now!
  .aspect('requiredB', Aspect.required(() => false))
```

### Back to the date example

Using these standard aspects let's try to simplify the previous date range example...

```js
import Structure, { Aspect } from 'constructure';

const structure = Structure.shape({
  fromDate: Structure.string()
    .aspect('isValidDate', Aspect.validDate()),
  toDate: Structure.string()
    .aspect('isValidDate', Aspect.validDate())
    // This is one of the more complex standard aspects. See it's description for how it works.
    .aspect('isGreater', Aspect.minDate((_, req) => req[1], {
      require: ['$this:isValidDate', '$parent.fromDate:isValidDate']
    }))
});
```

## Execution

So once you have a structure and all the bits and pieces you need to verify some data. it really is as easy as...

```js
const value = ??? // What are you gonna verify today?

const promise = structure.run(value)
    .then((result) => {
        // Thats right, we are asynchronous!
    });
```

### The result

And the result is,... the most important part. But what does it look like?

#### Simple result

For simple values(string, number, boolean, date, object, array, any) it looks like the follow example.

But each aspect has a result value AND at the property level? Yep. That is because we combine the result of all of the aspects to reach a single result value for the property. Which means there is a priority level for each result type.

fatal > blocked > non-fatal > pass.

If even one aspect is marked as fatal then the result for the property will be fatal.

```js
const result = {
  $r: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
  $a: {
    attA: {
      value: 'aspectValue',
      result: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
      message: 'Failed validation message here',
    },
    attB: {
      value: 'aspectValue',
      result: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
      message: 'Failed validation message here',
    },
  },
};
```

### Complex result

Complex values(shape, objectOf, arrayOf, lazy, oneOfType) are, well, complex. Let's start with shape...

#### Shape

Ok this really is simple. But the same logic for the hierarchy of results we saw before is the same here. Once we have the final results value for the aspects for the shape structure we then combine it with the results from all the properties for the shape into one final result.

So even if all of the aspects for the shape are passing if any child property of the same is marked fatal, then the shape will be fatal as well.

```js {
const result = {
  $r: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
  $a: {
    /// Any aspects for the shape structure
    attA: {
      value: 'aspectValue',
      result: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
      message: 'Failed validation message here',
    },
  },
  // Then the results for all the properties in the shape structure.
  propertyA: {
    $r: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
    $a: {
      /// Any aspects for the propertyA structure
      attA: {
        value: 'aspectValue',
        result: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
        message: 'Failed validation message here',
      },
    },
  },
};
```

#### ObjectOf

This is basically the same as shape just with a common structure for each property value.

#### ArrayOf

This is basically the same as shape just with indexes instead of property keys.

#### Lazy

Okay this is a little different here. Everything works the same but because you can have aspects on the lazy structure itself as well as the structure it returns we have two sets of results for one property value!

We need to combine them! Really the only thing to realize here is the two results cannot share similar aspect names. Otherwise it is just simple merge of aspects and properties(if the callback returns another complex structure). Also the results of the two are compared for the worst result type.

But in the end it is no different of a result than what would be returned for the structure which is was used.

#### OneOf Type

This is the most complex but in the end it is the same train of thought as Lazy. The only difference here is we need to determine which structure works. Once we have a working structure then the results from that one are used to get the results from the aspects.
