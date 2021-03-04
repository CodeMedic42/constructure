export default function getResult(Structure, Aspect) {
    const personStructure = Structure.object({
        demographics: Structure.object({
            firstName: Structure.string()
                .aspect('required', Aspect.required())
                .aspect('minLength', Aspect.minLength(1))
                .aspect('maxLength', Aspect.maxLength(50)),
            middleName: Structure.string()
                .aspect('minLength', Aspect.minLength(1))
                .aspect('maxLength', Aspect.maxLength(50)),
            lastName: Structure.string()
                .aspect('required', Aspect.required())
                .aspect('minLength', Aspect.minLength(1))
                .aspect('maxLength', Aspect.maxLength(50)),
            dateOfBirth: Structure.string(),
            address: Structure.object({
                street1: Structure.string()
                    .aspect('minLength', Aspect.minLength(1))
                    .aspect('maxLength', Aspect.maxLength(100)),
                street2: Structure.string()
                    .aspect('minLength', Aspect.minLength(1))
                    .aspect('maxLength', Aspect.maxLength(100)),
                city: Structure.string()
                    .aspect('minLength', Aspect.minLength(1))
                    .aspect('maxLength', Aspect.maxLength(50)),
                state: Structure.string()
                    .aspect('exactLength', Aspect.exactLength(2)),
                postalCode: Structure.string()
                    .aspect('pattern', Aspect.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)),
            }),
            phones: Structure.object(
                Structure.string()
                    .aspect('pattern', Aspect.pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)),
            ),
            email: Structure.string()
                .aspect('pattern', Aspect.emailPattern()),
        }),
        relations: Structure.arrayOf(Structure.object({
            relationship: Structure.string()
                .aspect('required', Aspect.required()),
            relation: Structure.lazy(() => personStructure)
                .aspect('required', Aspect.required()),
        })),
    });

    const testValue = {
        demographics: {
            firstName: 'John',
            lastName: null,
            dateOfBirth: '13/33/1980',
            address: {
                street1: '237 Example Street',
                city: 'Raleigh',
                state: 'NC',
                postalCode: '145',
            },
            phones: {
                cell: '123-456-7890',
                home: '123-34-AAAA',
            },
        },
        relations: [{
            relationship: 'Wife',
            relation: {
                demographics: {
                    firstName: 'Jane',
                    lastName: '',
                    dateOfBirth: null,
                },
            },
        }],
    };

    return personStructure.run(testValue);
}
