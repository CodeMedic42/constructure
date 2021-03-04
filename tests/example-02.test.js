import chai from 'chai';
import Structure, { Aspect } from '../src';
import example02Logic from '../examples/example-02/src/logic';

const { expect } = chai;

describe('Example 02', () => {
    it('Regular', () => {
        return example02Logic(Structure, Aspect).then((result) => {
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
                                },
                                $r: 'pass',
                            },
                            middleName: {
                                $a: {},
                                $r: 'pass',
                            },
                            lastName: {
                                $a: {
                                    required: {
                                        value: true,
                                        result: 'fatal',
                                        message: 'Required',
                                    },
                                },
                                $r: 'fatal',
                            },
                            dateOfBirth: {
                                $a: {},
                                $r: 'pass',
                            },
                            email: {
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
                                                        },
                                                        $r: 'pass',
                                                    },
                                                    middleName: {
                                                        $a: {},
                                                        $r: 'pass',
                                                    },
                                                    lastName: {
                                                        $a: {
                                                            required: {
                                                                value: true,
                                                                result: 'fatal',
                                                                message: 'Required',
                                                            },
                                                        },
                                                        $r: 'fatal',
                                                    },
                                                    dateOfBirth: {
                                                        $a: {},
                                                        $r: 'pass',
                                                    },
                                                    email: {
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
                                                        $d: {},
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
        return example02Logic(Structure, Aspect).then((result) => {
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
                    },
                    $r: 'pass',
                },
                'demographics.middleName': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.lastName': {
                    $a: {
                        required: {
                            value: true,
                            result: 'fatal',
                            message: 'Required',
                        },
                    },
                    $r: 'fatal',
                },
                'demographics.dateOfBirth': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.email': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.address': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.address.street1': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.address.street2': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.address.city': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.address.state': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.address.postalCode': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.phones': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.phones.cell': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.phones.home': {
                    $a: {},
                    $r: 'pass',
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
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.middleName': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.lastName': {
                    $a: {
                        required: {
                            value: true,
                            result: 'fatal',
                            message: 'Required',
                        },
                    },
                    $r: 'fatal',
                },
                'relations.0.relation.demographics.dateOfBirth': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.email': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.street1': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.street2': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.city': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.state': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.postalCode': {
                    $a: {},
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
