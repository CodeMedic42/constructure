# Constructure

Constructure is a schema validation library where you are in control. Its main focus is to provide an interface where a developer can define a schema for a set of data and the logic needed to validate it. But more importantly to link and choreograph all the validation logic. If you have a validator which uses the value from somewhere else in the data you can do this. But if that value is not valid you can block the validator from running until its required value is passing its validation.




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
    firstName: Structure.string()
        .aspects({
            required: Aspect.require()
        }),
    lastName: Structure.string(),
    phoneNumber: Structure.string(),
    contacts: Structure.arrayOf(
        // We need to use the lazy callback here to get personStructure later after it has been instantiated.
        Structure.lazy(() => structure)
    )
});
```




## Aspects
The main draw of this library is its aspect system.

```js
import { Aspect } from 'constructure';
```

Aspects are keyed pieces of data which can be associated to each structure.

Defining aspects for a structure is as simple as ...

```js
structure.aspects({
    attA: Aspect('test'),
    attB: Aspect(42),
    attC: Aspect(true),
})
```

Aspects can be applied to any structure and can be any value type.

A callback function can be provided by which the aspect value can be dynamically determined. The first argument to the callback function is the value which is being verified by the structure. The return value for this callback function will become the value for the aspect. This return value can also be a promise.

```js
structure.aspects({
    dynamicAtt: Aspect((value) => {
        return value == null; // the value of the the dynamicAtt aspect will be a boolean value.
    }),
})
```





### Validation

Each aspect can also have validation logic associated with it. To do this each aspect has a method to set the validator logic.

#### __Validator Logic__
The first argument to this method must be a function, a callback. This is called to validate the aspect. There are three arguments passed to this callback, the value of the property, the value of the aspect, and any requirements(Reviewed later). If the aspect was promise then the validator will not be called until that promise is resolved. The return value from this callback should be either null or a string. If null is returned then this means the validation is passing. Otherwise the string means it failed and the string provides a message indicating as to the reason for the failure.

#### __Validator Result__
The second and last argument for the validator is the result type. There are two types, 'fatal' and 'non-fatal'. A true value(default) means that if the validator logic returns a message then the result will be fatal. A false value means that it is not fatal.

```js
const validatorCallback = (value, aspectValue, requirements) => {
    return 'Message';
}

const isFatal = true;

structure.aspects({
    att: Aspect('test').setValidator(validatorCallback, isFatal),
})
```

Getting the results from a validation will be discussed later in the Execution section.





### Requirements

Sometimes an aspect requires the value, or aspect value, of another property in the data. This is called a requirement. This enters into the more advanced part of this library but is also the most useful as well.

There are a few simple real world examples which we will get into later, but first let's just resolve the functionality. It all starts with a call to a method off the aspect called setRequirements.

#### __Internal__

In this example we can see that one aspect of a structure can require the value of another aspect.

```js
const structure = Structure.shape({
    propertyA: Structure.string()
        .aspects({
            attA: Aspect(42),
            attB: Aspect((
                // The value of propertyA.
                value, 
                // An array of all requirements in the order they were specified.
                // In this example we will get [42]
                requirements 
            ) => { 
            }).setRequirements([':attA']), // Note that there is a long hand version of this, "$this:attA"
        }),
});
```

Multiple aspects can be chained like this. Here attC requires attB which in turn requires attA.

```js
const structure = Structure.shape({
    propertyA: Structure.string()
        .aspects({
            attA: Aspect(42),
            attB: Aspect((value, requirements) => {}).setRequirements([':attA']),
            attC: Aspect((value, requirements) => {}).setRequirements([':attB']),
        }),
});
```

#### __Children__

But what if you need something from somewhere else in the data? Well, we got ya covered!

Let's start with getting a child value. Here we will add the aspect to the shape. We will also make the overall structure a little deeper.

Then we will add an aspect to the root and then access the aspect value from a child property

```js
const structure = Structure.shape({
    levelA: Structure.shape({
        levelB: Structure.shape({  
            propertyA: Structure.string()
                .aspects({
                    attA: Aspect(42),
                }),
        })    
    })
})
// Here we will add an aspect to the root structure.
.aspects({
    rootAttA: Aspect((value, requirements) => {})
        .setRequirements([
            // This will get the value from specified child.
            // Note that there is a long hand version of this, "$this.levelA.levelB.propertyA"
            'levelA.levelB.propertyA', 
            // This will get the aspect value from specified child.
            // Note that there is a long hand version of this, "$this.levelA.levelB.propertyA:attA"
            'levelA.levelB.propertyA:attA', 
        ]),
});
```

#### __Siblings__

Okay but what if you want to get a sibling value? Just use "$parent"! BAM!

```js
const structure = Structure.shape({
    propertyA: Structure.string()
        .aspects({
            attA: Aspect(42),
        }),
    propertyB: Structure.string()
        .aspects({
            attA: Aspect((value, requirements) => {}).setRequirements(['$parent.propertyA:attA']),
        }),
});
```

#### __Up the Tree__

Okay big shot how do I go up? Uh I just told you, $parent. Go as high as you want. If you go beyond root it will stop at root.

```js
const structure = Structure.shape({
    levelA: Structure.shape({
        propertyA: Structure.string()
            .aspects({
                attA: Aspect(42),
            }),
        levelB: Structure.shape({  
            propertyA: Structure.string()
                .aspects({
                    attA: Aspect((value, requirements) => {}).setRequirements(['$parent.$parent.propertyA:attA']),
                }),
        })    
    })
});
```

#### __From the Top__

Ok what's the keyword for starting from root? Exactly!

```js
const structure = Structure.shape({
    levelA: Structure.shape({
        propertyA: Structure.string()
            .aspects({
                attA: Aspect(42),
            }),
        levelB: Structure.shape({  
            propertyA: Structure.string()
                .aspects({
                    attA: Aspect((value, requirements) => {}).setRequirements(['$root.levelA.propertyA:attA']),
                }),
        })    
    })
});
```

#### __Arrays__

Nice but I have to pass through an array and going up through using parent seems, bleh. Yeah that was what I thought. Which is why I did this...

```js
const structure = Structure.shape({
    levelA: Structure.arrayOf(
        Structure.shape({  
            propertyA: Structure.string(),
            levelB: Structure.shape({  
                propertyA: Structure.string()
                    .aspects({
                        attA: Aspect((value, requirements) => {}).setRequirements(['$root.levelA.$index.propertyA:attA']),
                    }),
            })
        })    
    )
});
```

#### __Putting it together__

This does not look particularly useful at the moment I am sure. But there are two parts I have not told you about yet.

1. The validator logic ALSO gets these requirements. The validation callback gets these as a third argument.
2. If a required aspect is failing its validation then the aspect requiring it will NOT be evaluated. This is useful if you have a value which can be invalid in such a way that it cannot be used until it is valid. This means you can block the logic of one aspect until the other becomes valid! But it will only block if the validation is failing AND is marked fatal.
    
Let's do an example, which will be a date range where two properties are dates in the form of strings. The first date must be less than the second. But it is also possible that one or both are invalid dates.

To solve this we are going to use everything that we have discussed so far.

```js
import Structure, { Aspect } from 'constructure';
import { isNil, isNan } from 'lodash';

const isValidDateAspect = 
    Aspect(
        // This will create an aspect with a value of a Date object if the string value is not nil.
        (value) => !isNil(value) ? new Date(value) : null
    )
    .setValidator((_, aspectValue) =>
        // Then if the aspect value is not nil it will try to get the Time
        // If the time is a Nan value then that means that string value is not a valid date
        // which will result in a fatally failing aspect for the given string value
        isNil(aspectValue) || !isNan(aspectValue.getTime()) ? null : 'Not a valid Date'
    );

const isGreaterDate = 
    Aspect(true) // We Really don't need an aspect value but true is a good one to set here.
    .setValidator((value, _, requirements) =>
        const toDate = requirements[0];
        const fromDate = requirements[1];

        if (isNil(value) || fromDate < toDate) {
            return null;
        }

        return `Must be greater than ${fromDate}`;
    );

const structure  = Structure.shape({
    fromDate: Structure.string()
        .aspects({
            isValidDate: isValidDateAspect
        }),
    toDate: Structure.string()
        .aspects({
            isValidDate: isValidDateAspect
            // The validation for this aspect will ONLY run once the the other two required aspects pass their validation.
            isGreater: isGreaterDate.setRequirements(['$this:isValidDate', '$parent.fromDate:isValidDate'])
        }),
});
```

### Standard Aspects

There are also a number of pre-defined aspects. These can be found on the Aspect class. The actual name of the aspect that these can be placed on can be anything you want. Though for the sake of your own sanity we really recommend that you use the same name.

```js
import { Aspect } from 'constructure';
```

#### __Required__
This will define an aspect which has validation logic which will result in a fatal message indicating that the value is nil and should not be. This aspect can be used with any structure. The

```js
const structure = Structure.string().aspects({
    required: Aspect.required()
    requiredA: Aspect.required(false) // This will disable the validator, you would not do this
    requiredA: Aspect.required(() => false)) // AHH tou can dynamically control it now! You might do this. Just wait till you see
});
```

### Back to the date example

Using these standard aspects let's try to simplify the previous date range example...

```js
import Structure, { Aspect } from 'constructure';

const structure  = Structure.shape({
    fromDate: Structure.string()
        .aspects({
            isValidDate: Aspect.validDate(),
        }),
    toDate: Structure.string()
        .aspects({
            isValidDate: Aspect.validDate(),
            // This is one of the more complex standard aspects
            isGreater: Aspect.minDate((_, req) => req[1]).setRequirements(['$this:isValidDate', '$parent.fromDate:isValidDate'])
        }),
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
            message: 'Failed validation message here'
        },
        attB: {
            value: 'aspectValue',
            result: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
            message: 'Failed validation message here'
        }
    }
}
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
            message: 'Failed validation message here'
        }
    },
    // Then the results for all the properties in the shape structure.
    propertyA: {
        $r: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
        $a: {
            /// Any aspects for the propertyA structure
            attA: {
                value: 'aspectValue',
                result: 'pass' || 'fatal' || 'non-fatal' || 'blocked',
                message: 'Failed validation message here'
            }
        },
    }
}
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