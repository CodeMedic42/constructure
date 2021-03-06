export default function getResult(Structure, Aspect) {
    const personStructure = Structure.object({
        demographics: Structure.object({
            firstName: Structure.string()
                .aspect(Aspect.required()),
            middleName: Structure.string(),
            lastName: Structure.string()
                .aspect(Aspect.required()),
            dateOfBirth: Structure.string(),
            address: Structure.object({
                street1: Structure.string(),
                street2: Structure.string(),
                city: Structure.string(),
                state: Structure.string(),
                postalCode: Structure.string(),
            }),
            phones: Structure.object(Structure.string()),
            email: Structure.string(),
        }),
        relations: Structure.array(Structure.object({
            relationship: Structure.string()
                .aspect(Aspect.required()),
            relation: Structure.lazy(() => personStructure)
                .aspect(Aspect.required()),
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
                    lastName: null,
                    dateOfBirth: null,
                },
            },
        }],
    };

    return personStructure.run(testValue);
}
