import chai from 'chai';
import Structure from '../src';

const { expect } = chai;

describe('Examples', () => {
    it('Example 01', () => {
        const personStructure = Structure.shape({
            demographics: Structure.shape({
                firstName: Structure.string(),
                middleName: Structure.string(),
                lastName: Structure.string(),
                dateOfBirth: Structure.string(),
                address: Structure.shape({
                    street1: Structure.string(),
                    street2: Structure.string(),
                    city: Structure.string(),
                    state: Structure.string(),
                    postalCode: Structure.string(),
                }),
                phones: Structure.objectOf(Structure.string()),
            }),
            relations: Structure.arrayOf(Structure.shape({
                relationship: Structure.string(),
                relation: Structure.lazy(() => personStructure),
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
                    postalCode: '12345',
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

        return personStructure.run(testValue).then((result) => {
            expect(result.toJS()).to.eql({
                $a: {},
                $r: 'pass',
                $d: {
                    demographics: {
                        $a: {},
                        $r: 'pass',
                        $d: {
                            firstName: {
                                $a: {},
                                $r: 'pass',
                            },
                            middleName: {
                                $a: {},
                                $r: 'pass',
                            },
                            lastName: {
                                $a: {},
                                $r: 'pass',
                            },
                            dateOfBirth: {
                                $a: {},
                                $r: 'pass',
                            },
                            address: {
                                $a: {},
                                $r: 'pass',
                                $d: {
                                    street1: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                    street2: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                    city: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                    state: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                    postalCode: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                },
                            },
                            phones: {
                                $a: {},
                                $r: 'pass',
                                $d: {
                                    cell: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                    home: {
                                        $a: {},
                                        $r: 'pass',
                                    },
                                },
                            },
                        },
                    },
                    relations: {
                        $a: {},
                        $r: 'pass',
                        $d: [{
                            $a: {},
                            $r: 'pass',
                            $d: {
                                relationship: {
                                    $a: {},
                                    $r: 'pass',
                                },
                                relation: {
                                    $a: {},
                                    $r: 'pass',
                                    $d: {
                                        demographics: {
                                            $a: {},
                                            $r: 'pass',
                                            $d: {
                                                firstName: {
                                                    $a: {},
                                                    $r: 'pass',
                                                },
                                                middleName: {
                                                    $a: {},
                                                    $r: 'pass',
                                                },
                                                lastName: {
                                                    $a: {},
                                                    $r: 'pass',
                                                },
                                                dateOfBirth: {
                                                    $a: {},
                                                    $r: 'pass',
                                                },
                                                address: {
                                                    $a: {},
                                                    $r: 'pass',
                                                    $d: {
                                                        street1: {
                                                            $a: {},
                                                            $r: 'pass',
                                                        },
                                                        street2: {
                                                            $a: {},
                                                            $r: 'pass',
                                                        },
                                                        city: {
                                                            $a: {},
                                                            $r: 'pass',
                                                        },
                                                        state: {
                                                            $a: {},
                                                            $r: 'pass',
                                                        },
                                                        postalCode: {
                                                            $a: {},
                                                            $r: 'pass',
                                                        },
                                                    },
                                                },
                                                phones: {
                                                    $a: {},
                                                    $r: 'pass',
                                                },
                                            },
                                        },
                                        relations: {
                                            $a: {},
                                            $r: 'pass',
                                        },
                                    },
                                },
                            },
                        }],
                    },
                },
            });
        });
    });
});
