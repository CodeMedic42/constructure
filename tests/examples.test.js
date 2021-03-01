import chai from 'chai';
import Structure, { Aspect } from '../src';

const { expect } = chai;

describe('Examples', () => {
    describe('Example 01', () => {
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

        it('Regular', () => {
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

        it('Flat', () => {
            return personStructure.run(testValue).then((result) => {
                expect(result.toJS(true)).to.eql({
                    '': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.firstName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.middleName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.lastName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.dateOfBirth': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.street1': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.street2': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.city': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.state': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.postalCode': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones.cell': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones.home': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relationship': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.firstName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.middleName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.lastName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.dateOfBirth': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.street1': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.street2': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.city': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.state': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.postalCode': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.phones': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.relations': {
                        $a: {},
                        $r: 'pass'
                    }
                });
            });
        });
    });

    describe('Example 02', () => {
        const personStructure = Structure.shape({
            demographics: Structure.shape({
                firstName: Structure.string()
                    .aspect('required', Aspect.required()),
                middleName: Structure.string(),
                lastName: Structure.string()
                    .aspect('required', Aspect.required()),
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
                        lastName: null,
                        dateOfBirth: null,
                    },
                },
            }],
        };

        it('Regular', () => {
            return personStructure.run(testValue).then((result) => {
                expect(result.toJS()).to.eql({
                    $a: {},
                    $r: 'fatal',
                    $d: {
                        demographics: {
                            $a: {},
                            $r: 'fatal',
                            $d: {
                                firstName: {
                                    $a: {
                                        required: {
                                            value: true,
                                            result: 'pass',
                                            message: null
                                        }
                                    },
                                    $r: 'pass'
                                },
                                middleName: {
                                    $a: {},
                                    $r: 'pass'
                                },
                                lastName: {
                                    $a: {
                                        required: {
                                            value: true,
                                            result: 'fatal',
                                            message: 'Required'
                                        }
                                    },
                                    $r: 'fatal'
                                },
                                dateOfBirth: {
                                    $a: {},
                                    $r: 'pass'
                                },
                                address: {
                                    $a: {},
                                    $r: 'pass',
                                    $d: {
                                        street1: {
                                            $a: {},
                                            $r: 'pass'
                                        },
                                        street2: {
                                            $a: {},
                                            $r: 'pass'
                                        },
                                        city: {
                                            $a: {},
                                            $r: 'pass'
                                        },
                                        state: {
                                            $a: {},
                                            $r: 'pass'
                                        },
                                        postalCode: {
                                            $a: {},
                                            $r: 'pass'
                                        }
                                    }
                                },
                                phones: {
                                    $a: {},
                                    $r: 'pass',
                                    $d: {
                                        cell: {
                                            $a: {},
                                            $r: 'pass'
                                        },
                                        home: {
                                            $a: {},
                                            $r: 'pass'
                                        }
                                    }
                                }
                            }
                        },
                        relations: {
                            $a: {},
                            $r: 'fatal',
                            $d: [
                                {
                                    $a: {},
                                    $r: 'fatal',
                                    $d: {
                                        relationship: {
                                            $a: {
                                                required: {
                                                    value: true,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'pass'
                                        },
                                        relation: {
                                            $a: {
                                                required: {
                                                    value: true,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'fatal',
                                            $d: {
                                                demographics: {
                                                    $a: {},
                                                    $r: 'fatal',
                                                    $d: {
                                                        firstName: {
                                                            $a: {
                                                                required: {
                                                                    value: true,
                                                                    result: 'pass',
                                                                    message: null
                                                                }
                                                            },
                                                            $r: 'pass'
                                                        },
                                                        middleName: {
                                                            $a: {},
                                                            $r: 'pass'
                                                        },
                                                        lastName: {
                                                            $a: {
                                                                required: {
                                                                    value: true,
                                                                    result: 'fatal',
                                                                    message: 'Required'
                                                                }
                                                            },
                                                            $r: 'fatal'
                                                        },
                                                        dateOfBirth: {
                                                            $a: {},
                                                            $r: 'pass'
                                                        },
                                                        address: {
                                                            $a: {},
                                                            $r: 'pass',
                                                            $d: {
                                                                street1: {
                                                                    $a: {},
                                                                    $r: 'pass'
                                                                },
                                                                street2: {
                                                                    $a: {},
                                                                    $r: 'pass'
                                                                },
                                                                city: {
                                                                    $a: {},
                                                                    $r: 'pass'
                                                                },
                                                                state: {
                                                                    $a: {},
                                                                    $r: 'pass'
                                                                },
                                                                postalCode: {
                                                                    $a: {},
                                                                    $r: 'pass'
                                                                }
                                                            }
                                                        },
                                                        phones: {
                                                            $a: {},
                                                            $r: 'pass'
                                                        }
                                                    }
                                                },
                                                relations: {
                                                    $a: {},
                                                    $r: 'pass'
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                });
            });
        });

        it('Flat', () => {
            return personStructure.run(testValue).then((result) => {
                expect(result.toJS(true)).to.eql({
                    '': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'demographics': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'demographics.firstName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            }
                        },
                        $r: 'pass'
                    },
                    'demographics.middleName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.lastName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'fatal',
                                message: 'Required'
                            }
                        },
                        $r: 'fatal'
                    },
                    'demographics.dateOfBirth': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.street1': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.street2': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.city': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.state': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address.postalCode': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones.cell': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones.home': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'relations.0': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'relations.0.relationship': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            }
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            }
                        },
                        $r: 'fatal'
                    },
                    'relations.0.relation.demographics': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'relations.0.relation.demographics.firstName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            }
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.middleName': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.lastName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'fatal',
                                message: 'Required'
                            }
                        },
                        $r: 'fatal'
                    },
                    'relations.0.relation.demographics.dateOfBirth': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.street1': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.street2': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.city': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.state': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.postalCode': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.phones': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.relations': {
                        $a: {},
                        $r: 'pass'
                    }
                });
            });
        });
    });

    describe('Example 03', () => {
        const personStructure = Structure.shape({
            demographics: Structure.shape({
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
                address: Structure.shape({
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
                        .aspect('minLength', Aspect.minLength(5))
                        .aspect('maxLength', Aspect.maxLength(10)),
                }),
                phones: Structure.objectOf(Structure.string()),
            }),
            relations: Structure.arrayOf(Structure.shape({
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

        it('Regular', () => {
            return personStructure.run(testValue).then((result) => {
                expect(result.toJS()).to.eql({
                    $a: {},
                    $r: 'fatal',
                    $d: {
                        demographics: {
                            $a: {},
                            $r: 'fatal',
                            $d: {
                                firstName: {
                                    $a: {
                                        required: {
                                            value: true,
                                            result: 'pass',
                                            message: null
                                        },
                                        maxLength: {
                                            message: null,
                                            result: 'pass',
                                            value: 50,
                                        },
                                        minLength: {
                                            value: 1,
                                            result: 'pass',
                                            message: null
                                        }
                                    
                                    },
                                    $r: 'pass'
                                },
                                middleName: {
                                    $a: {
                                        maxLength: {
                                            message: null,
                                            result: 'pass',
                                            value: 50,
                                        },
                                        minLength: {
                                            value: 1,
                                            result: 'pass',
                                            message: null
                                        }
                                    },
                                    $r: 'pass'
                                },
                                lastName: {
                                    $a: {
                                        required: {
                                            value: true,
                                            result: 'fatal',
                                            message: 'Required'
                                        },
                                        maxLength: {
                                            message: null,
                                            result: 'pass',
                                            value: 50,
                                        },
                                        minLength: {
                                            value: 1,
                                            result: 'pass',
                                            message: null
                                        }
                                    
                                    },
                                    $r: 'fatal'
                                },
                                dateOfBirth: {
                                    $a: {},
                                    $r: 'pass'
                                },
                                address: {
                                    $r: 'fatal',
                                    $a: {},
                                    $d: {
                                        street1: {
                                            $a: {
                                                maxLength: {
                                                    message: null,
                                                    result: 'pass',
                                                    value: 100,
                                                },
                                                minLength: {
                                                    value: 1,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'pass'
                                        },
                                        street2: {
                                            $a: {
                                                maxLength: {
                                                    message: null,
                                                    result: 'pass',
                                                    value: 100,
                                                },
                                                minLength: {
                                                    value: 1,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'pass'
                                        },
                                        city: {
                                            $a: {
                                                maxLength: {
                                                    message: null,
                                                    result: 'pass',
                                                    value: 50,
                                                },
                                                minLength: {
                                                    value: 1,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'pass'
                                        },
                                        state: {
                                            $a: {
                                                exactLength: {
                                                    message: null,
                                                    result: 'pass',
                                                    value: 2,
                                                },
                                            },
                                            $r: 'pass'
                                        },
                                        postalCode: {
                                            $r: 'fatal',
                                            $a: {
                                                maxLength: {
                                                    message: null,
                                                    result: 'pass',
                                                    value: 10,
                                                },
                                                minLength: {
                                                    value: 5,
                                                    result: 'fatal',
                                                    message: 'Min Length',
                                                }
                                            },
                                        }
                                    }
                                },
                                phones: {
                                    $a: {},
                                    $r: 'pass',
                                    $d: {
                                        cell: {
                                            $a: {},
                                            $r: 'pass'
                                        },
                                        home: {
                                            $a: {},
                                            $r: 'pass'
                                        }
                                    }
                                }
                            }
                        },
                        relations: {
                            $a: {},
                            $r: 'fatal',
                            $d: [
                                {
                                    $a: {},
                                    $r: 'fatal',
                                    $d: {
                                        relationship: {
                                            $a: {
                                                required: {
                                                    value: true,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'pass'
                                        },
                                        relation: {
                                            $a: {
                                                required: {
                                                    value: true,
                                                    result: 'pass',
                                                    message: null
                                                }
                                            },
                                            $r: 'fatal',
                                            $d: {
                                                demographics: {
                                                    $a: {},
                                                    $r: 'fatal',
                                                    $d: {
                                                        firstName: {
                                                            $a: {
                                                                required: {
                                                                    value: true,
                                                                    result: 'pass',
                                                                    message: null
                                                                },
                                                                maxLength: {
                                                                    message: null,
                                                                    result: 'pass',
                                                                    value: 50,
                                                                },
                                                                minLength: {
                                                                    value: 1,
                                                                    result: 'pass',
                                                                    message: null
                                                                }
                                                            },
                                                            $r: 'pass'
                                                        },
                                                        middleName: {
                                                            $a: {
                                                                maxLength: {
                                                                    message: null,
                                                                    result: 'pass',
                                                                    value: 50,
                                                                },
                                                                minLength: {
                                                                    value: 1,
                                                                    result: 'pass',
                                                                    message: null
                                                                }
                                                            },
                                                            $r: 'pass'
                                                        },
                                                        lastName: {
                                                            $a: {
                                                                required: {
                                                                    value: true,
                                                                    result: 'pass',
                                                                    message: null
                                                                },
                                                                maxLength: {
                                                                    message: null,
                                                                    result: 'pass',
                                                                    value: 50,
                                                                },
                                                                minLength: {
                                                                    value: 1,
                                                                    result: 'fatal',
                                                                    message: 'Min Length'
                                                                }
                                                            },
                                                            $r: 'fatal'
                                                        },
                                                        dateOfBirth: {
                                                            $a: {},
                                                            $r: 'pass'
                                                        },
                                                        address: {
                                                            $a: {},
                                                            $r: 'pass',
                                                            $d: {
                                                                street1: {
                                                                    $a: {
                                                                        maxLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 100,
                                                                        },
                                                                        minLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 1,
                                                                        }
                                                                    },
                                                                    $r: 'pass'
                                                                },
                                                                street2: {
                                                                    $a: {
                                                                        maxLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 100,
                                                                        },
                                                                        minLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 1,
                                                                        }
                                                                    },
                                                                    $r: 'pass'
                                                                },
                                                                city: {
                                                                    $a: {
                                                                        maxLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 50,
                                                                        },
                                                                        minLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 1,
                                                                        }
                                                                    },
                                                                    $r: 'pass'
                                                                },
                                                                state: {
                                                                    $a: {
                                                                        exactLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 2,
                                                                        },
                                                                    },
                                                                    $r: 'pass'
                                                                },
                                                                postalCode: {
                                                                    $a: {
                                                                        maxLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 10,
                                                                        },
                                                                        minLength: {
                                                                            message: null,
                                                                            result: 'pass',
                                                                            value: 5,
                                                                        }
                                                                    },
                                                                    $r: 'pass'
                                                                }
                                                            }
                                                        },
                                                        phones: {
                                                            $a: {},
                                                            $r: 'pass'
                                                        }
                                                    }
                                                },
                                                relations: {
                                                    $a: {},
                                                    $r: 'pass'
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                });
            });
        });

        it('Flat', () => {
            return personStructure.run(testValue).then((result) => {
                expect(result.toJS(true)).to.eql({
                    '': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'demographics': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'demographics.firstName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            },
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }
                        },
                        $r: 'pass'
                    },
                    'demographics.middleName': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }
                        },
                        $r: 'pass'
                    },
                    'demographics.lastName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'fatal',
                                message: 'Required'
                            },
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }
                        },
                        $r: 'fatal'
                    },
                    'demographics.dateOfBirth': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.address': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'demographics.address.street1': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 100,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }
                        },
                        $r: 'pass'
                    },
                    'demographics.address.street2': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 100,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }
                        },
                        $r: 'pass'
                    },
                    'demographics.address.city': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }
                        },
                        $r: 'pass'
                    },
                    'demographics.address.state': {
                        $a: {
                            exactLength: {
                                message: null,
                                result: 'pass',
                                value: 2,
                            },
                        },
                        $r: 'pass'
                    },
                    'demographics.address.postalCode': {
                        $a: {
                            minLength: {
                                value: 5,
                                result: 'fatal',
                                message: 'Min Length'
                            },
                            maxLength: {
                                value: 10,
                                result: 'pass',
                                message: null,
                            }
                        },
                        $r: 'fatal'
                    },
                    'demographics.phones': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones.cell': {
                        $a: {},
                        $r: 'pass'
                    },
                    'demographics.phones.home': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'relations.0': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'relations.0.relationship': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            }
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            }
                        },
                        $r: 'fatal'
                    },
                    'relations.0.relation.demographics': {
                        $a: {},
                        $r: 'fatal'
                    },
                    'relations.0.relation.demographics.firstName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            },
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            }                    
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.middleName': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            } 
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.lastName': {
                        $a: {
                            required: {
                                value: true,
                                result: 'pass',
                                message: null
                            },
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: 'Min Length',
                                result: 'fatal',
                                value: 1,
                            }  
                        },
                        $r: 'fatal'
                    },
                    'relations.0.relation.demographics.dateOfBirth': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.street1': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 100,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            },
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.street2': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 100,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            },
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.city': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 50,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 1,
                            },
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.state': {
                        $a: {
                            exactLength: {
                                message: null,
                                result: 'pass',
                                value: 2,
                            },
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.address.postalCode': {
                        $a: {
                            maxLength: {
                                message: null,
                                result: 'pass',
                                value: 10,
                            },
                            minLength: {
                                message: null,
                                result: 'pass',
                                value: 5,
                            },
                        },
                        $r: 'pass'
                    },
                    'relations.0.relation.demographics.phones': {
                        $a: {},
                        $r: 'pass'
                    },
                    'relations.0.relation.relations': {
                        $a: {},
                        $r: 'pass'
                    }
                });
            });
        });
    });
});
