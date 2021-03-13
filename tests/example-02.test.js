import chai from 'chai';
import Structure, { Aspect } from '../src';
import example02Logic from '../examples/example-02/src/logic';

const { expect } = chai;

describe('Example 02', () => {
    it('Regular', () => {
        return example02Logic(Structure, Aspect).then((result) => {
            expect(result.toJS()).to.eql({
                $a: {},
                $v: {
                    $m: null,
                    $r: 'pass',
                },
                $r: 'fatal',
                $d: {
                    demographics: {
                        $a: {},
                        $v: {
                            $m: null,
                            $r: 'pass',
                        },
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
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'pass',
                            },
                            middleName: {
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
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
                                },
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'fatal',
                            },
                            dateOfBirth: {
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'pass',
                            },
                            email: {
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'pass',
                            },
                            address: {
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'pass',
                                $d: {
                                    street1: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                    street2: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                    city: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                    state: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                    postalCode: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                },
                            },
                            phones: {
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'pass',
                                $d: {
                                    cell: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                    home: {
                                        $a: {},
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'pass',
                                    },
                                },
                            },
                        },
                    },
                    relations: {
                        $a: {},
                        $v: {
                            $m: null,
                            $r: 'pass',
                        },
                        $r: 'fatal',
                        $d: [
                            {
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
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
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
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
                                        $v: {
                                            $m: null,
                                            $r: 'pass',
                                        },
                                        $r: 'fatal',
                                        $d: {
                                            demographics: {
                                                $a: {},
                                                $v: {
                                                    $m: null,
                                                    $r: 'pass',
                                                },
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
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
                                                        },
                                                        $r: 'pass',
                                                    },
                                                    middleName: {
                                                        $a: {},
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
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
                                                        },
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
                                                        },
                                                        $r: 'fatal',
                                                    },
                                                    dateOfBirth: {
                                                        $a: {},
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
                                                        },
                                                        $r: 'pass',
                                                    },
                                                    email: {
                                                        $a: {},
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
                                                        },
                                                        $r: 'pass',
                                                    },
                                                    address: {
                                                        $a: {},
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
                                                        },
                                                        $r: 'pass',
                                                        $d: {
                                                            street1: {
                                                                $a: {},
                                                                $v: {
                                                                    $m: null,
                                                                    $r: 'pass',
                                                                },
                                                                $r: 'pass',
                                                            },
                                                            street2: {
                                                                $a: {},
                                                                $v: {
                                                                    $m: null,
                                                                    $r: 'pass',
                                                                },
                                                                $r: 'pass',
                                                            },
                                                            city: {
                                                                $a: {},
                                                                $v: {
                                                                    $m: null,
                                                                    $r: 'pass',
                                                                },
                                                                $r: 'pass',
                                                            },
                                                            state: {
                                                                $a: {},
                                                                $v: {
                                                                    $m: null,
                                                                    $r: 'pass',
                                                                },
                                                                $r: 'pass',
                                                            },
                                                            postalCode: {
                                                                $a: {},
                                                                $v: {
                                                                    $m: null,
                                                                    $r: 'pass',
                                                                },
                                                                $r: 'pass',
                                                            },
                                                        },
                                                    },
                                                    phones: {
                                                        $a: {},
                                                        $v: {
                                                            $m: null,
                                                            $r: 'pass',
                                                        },
                                                        $d: {},
                                                        $r: 'pass',
                                                    },
                                                },
                                            },
                                            relations: {
                                                $a: {},
                                                $v: {
                                                    $m: null,
                                                    $r: 'pass',
                                                },
                                                $r: 'pass',
                                                $d: [],
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
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'fatal',
                },
                demographics: {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
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
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.middleName': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
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
                    },
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'fatal',
                },
                'demographics.dateOfBirth': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.email': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.address': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.address.street1': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.address.street2': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.address.city': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.address.state': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.address.postalCode': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.phones': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.phones.cell': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.phones.home': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                relations: {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'fatal',
                },
                'relations.0': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
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
                    $v: {
                        $m: null,
                        $r: 'pass',
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
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'fatal',
                },
                'relations.0.relation.demographics': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
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
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.middleName': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
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
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'fatal',
                },
                'relations.0.relation.demographics.dateOfBirth': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.email': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.street1': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.street2': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.city': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.state': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.address.postalCode': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.phones': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.relations': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
            });
        });
    });
});
