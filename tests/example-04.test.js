import chai from 'chai';
import Structure, { Aspect } from '../src';
import example04Logic from '../examples/example-04/src/logic';

const { expect } = chai;

describe('Example 04', () => {
    it('Regular', () => {
        return example04Logic(Structure, Aspect).then((result) => {
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
                                        message: null,
                                    },
                                    maxLength: {
                                        message: null,
                                        result: 'pass',
                                        value: 50,
                                    },
                                    minLength: {
                                        value: 1,
                                        result: 'pass',
                                        message: null,
                                    },

                                },
                                $r: 'pass',
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
                                        message: null,
                                    },
                                },
                                $r: 'pass',
                            },
                            lastName: {
                                $a: {
                                    required: {
                                        value: true,
                                        result: 'fatal',
                                        message: 'Required',
                                    },
                                    maxLength: {
                                        message: null,
                                        result: 'pass',
                                        value: 50,
                                    },
                                    minLength: {
                                        value: 1,
                                        result: 'pass',
                                        message: null,
                                    },

                                },
                                $r: 'fatal',
                            },
                            dateOfBirth: {
                                $a: {},
                                $r: 'pass',
                            },
                            email: {
                                $a: {
                                    pattern: {
                                        message: null,
                                        result: 'pass',
                                        value: true,
                                    },
                                },
                                $r: 'pass',
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
                                                message: null,
                                            },
                                        },
                                        $r: 'pass',
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
                                                message: null,
                                            },
                                        },
                                        $r: 'pass',
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
                                                message: null,
                                            },
                                        },
                                        $r: 'pass',
                                    },
                                    state: {
                                        $a: {
                                            exactLength: {
                                                message: null,
                                                result: 'pass',
                                                value: 2,
                                            },
                                        },
                                        $r: 'pass',
                                    },
                                    postalCode: {
                                        $r: 'fatal',
                                        $a: {
                                            pattern: {
                                                message: 'Pattern',
                                                result: 'fatal',
                                                value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                            },
                                        },
                                    },
                                },
                            },
                            phones: {
                                $a: {},
                                $r: 'fatal',
                                $d: {
                                    cell: {
                                        $a: {
                                            pattern: {
                                                message: null,
                                                result: 'pass',
                                                value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                                            },
                                        },
                                        $r: 'pass',
                                    },
                                    home: {
                                        $a: {
                                            pattern: {
                                                message: 'Pattern',
                                                result: 'fatal',
                                                value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                                            },
                                        },
                                        $r: 'fatal',
                                    },
                                },
                            },
                        },
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
                                                message: null,
                                            },
                                        },
                                        $r: 'pass',
                                    },
                                    relation: {
                                        $a: {
                                            required: {
                                                value: true,
                                                result: 'pass',
                                                message: null,
                                            },
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
                                                                message: null,
                                                            },
                                                            maxLength: {
                                                                message: null,
                                                                result: 'pass',
                                                                value: 50,
                                                            },
                                                            minLength: {
                                                                value: 1,
                                                                result: 'pass',
                                                                message: null,
                                                            },
                                                        },
                                                        $r: 'pass',
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
                                                                message: null,
                                                            },
                                                        },
                                                        $r: 'pass',
                                                    },
                                                    lastName: {
                                                        $a: {
                                                            required: {
                                                                value: true,
                                                                result: 'pass',
                                                                message: null,
                                                            },
                                                            maxLength: {
                                                                message: null,
                                                                result: 'pass',
                                                                value: 50,
                                                            },
                                                            minLength: {
                                                                value: 1,
                                                                result: 'fatal',
                                                                message: 'Min Length',
                                                            },
                                                        },
                                                        $r: 'fatal',
                                                    },
                                                    dateOfBirth: {
                                                        $a: {},
                                                        $r: 'pass',
                                                    },
                                                    email: {
                                                        $a: {
                                                            pattern: {
                                                                message: null,
                                                                result: 'pass',
                                                                value: true,
                                                            },
                                                        },
                                                        $r: 'pass',
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
                                                                    },
                                                                },
                                                                $r: 'pass',
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
                                                                    },
                                                                },
                                                                $r: 'pass',
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
                                                                    },
                                                                },
                                                                $r: 'pass',
                                                            },
                                                            state: {
                                                                $a: {
                                                                    exactLength: {
                                                                        message: null,
                                                                        result: 'pass',
                                                                        value: 2,
                                                                    },
                                                                },
                                                                $r: 'pass',
                                                            },
                                                            postalCode: {
                                                                $a: {
                                                                    pattern: {
                                                                        message: null,
                                                                        result: 'pass',
                                                                        value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                                                    },
                                                                },
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
                            },
                        ],
                    },
                },
            });
        });
    });

    it('Flat', () => {
        return example04Logic(Structure, Aspect).then((result) => {
            expect(result.toJS(true)).to.eql({
                '': {
                    $a: {},
                    $r: 'fatal',
                },
                demographics: {
                    $a: {},
                    $r: 'fatal',
                },
                'demographics.firstName': {
                    $a: {
                        required: {
                            value: true,
                            result: 'pass',
                            message: null,
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
                        },
                    },
                    $r: 'pass',
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
                        },
                    },
                    $r: 'pass',
                },
                'demographics.lastName': {
                    $a: {
                        required: {
                            value: true,
                            result: 'fatal',
                            message: 'Required',
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
                        },
                    },
                    $r: 'fatal',
                },
                'demographics.dateOfBirth': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.email': {
                    $a: {
                        pattern: {
                            message: null,
                            result: 'pass',
                            value: true,
                        },
                    },
                    $r: 'pass',
                },
                'demographics.address': {
                    $a: {},
                    $r: 'fatal',
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
                        },
                    },
                    $r: 'pass',
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
                        },
                    },
                    $r: 'pass',
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
                        },
                    },
                    $r: 'pass',
                },
                'demographics.address.state': {
                    $a: {
                        exactLength: {
                            message: null,
                            result: 'pass',
                            value: 2,
                        },
                    },
                    $r: 'pass',
                },
                'demographics.address.postalCode': {
                    $a: {
                        pattern: {
                            message: 'Pattern',
                            result: 'fatal',
                            value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                        },
                    },
                    $r: 'fatal',
                },
                'demographics.phones': {
                    $a: {},
                    $r: 'fatal',
                },
                'demographics.phones.cell': {
                    $a: {
                        pattern: {
                            message: null,
                            result: 'pass',
                            value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                        },
                    },
                    $r: 'pass',
                },
                'demographics.phones.home': {
                    $a: {
                        pattern: {
                            message: 'Pattern',
                            result: 'fatal',
                            value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                        },
                    },
                    $r: 'fatal',
                },
                relations: {
                    $a: {},
                    $r: 'fatal',
                },
                'relations.0': {
                    $a: {},
                    $r: 'fatal',
                },
                'relations.0.relationship': {
                    $a: {
                        required: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                    $r: 'pass',
                },
                'relations.0.relation': {
                    $a: {
                        required: {
                            value: true,
                            result: 'pass',
                            message: null,
                        },
                    },
                    $r: 'fatal',
                },
                'relations.0.relation.demographics': {
                    $a: {},
                    $r: 'fatal',
                },
                'relations.0.relation.demographics.firstName': {
                    $a: {
                        required: {
                            value: true,
                            result: 'pass',
                            message: null,
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
                        },
                    },
                    $r: 'pass',
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
                        },
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.lastName': {
                    $a: {
                        required: {
                            value: true,
                            result: 'pass',
                            message: null,
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
                        },
                    },
                    $r: 'fatal',
                },
                'relations.0.relation.demographics.dateOfBirth': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.email': {
                    $a: {
                        pattern: {
                            message: null,
                            result: 'pass',
                            value: true,
                        },
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address': {
                    $a: {},
                    $r: 'pass',
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
                    $r: 'pass',
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
                    $r: 'pass',
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
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.state': {
                    $a: {
                        exactLength: {
                            message: null,
                            result: 'pass',
                            value: 2,
                        },
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.postalCode': {
                    $a: {
                        pattern: {
                            message: null,
                            result: 'pass',
                            value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                        },
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.phones': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.relations': {
                    $a: {},
                    $r: 'pass',
                },
            });
        });
    });
});
