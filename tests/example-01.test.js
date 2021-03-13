import chai from 'chai';
import Structure from '../src';
import example01Logic from '../examples/example-01/src/logic';

const { expect } = chai;

describe('Example 01', () => {
    it('Regular', () => {
        return example01Logic(Structure).then((result) => {
            expect(result.toJS()).to.eql({
                $a: {},
                $v: {
                    $m: null,
                    $r: 'pass',
                },
                $r: 'pass',
                $d: {
                    demographics: {
                        $a: {},
                        $v: {
                            $m: null,
                            $r: 'pass',
                        },
                        $r: 'pass',
                        $d: {
                            firstName: {
                                $a: {},
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
                                $a: {},
                                $v: {
                                    $m: null,
                                    $r: 'pass',
                                },
                                $r: 'pass',
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
                        $r: 'pass',
                        $d: [{
                            $a: {},
                            $v: {
                                $m: null,
                                $r: 'pass',
                            },
                            $r: 'pass',
                            $d: {
                                relationship: {
                                    $a: {},
                                    $v: {
                                        $m: null,
                                        $r: 'pass',
                                    },
                                    $r: 'pass',
                                },
                                relation: {
                                    $a: {},
                                    $v: {
                                        $m: null,
                                        $r: 'pass',
                                    },
                                    $r: 'pass',
                                    $d: {
                                        demographics: {
                                            $a: {},
                                            $v: {
                                                $m: null,
                                                $r: 'pass',
                                            },
                                            $r: 'pass',
                                            $d: {
                                                firstName: {
                                                    $a: {},
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
                                                    $a: {},
                                                    $v: {
                                                        $m: null,
                                                        $r: 'pass',
                                                    },
                                                    $r: 'pass',
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
                        }],
                    },
                },
            });
        });
    });

    it('Flat', () => {
        return example01Logic(Structure).then((result) => {
            expect(result.toJS(true)).to.eql({
                '': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                demographics: {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'demographics.firstName': {
                    $a: {},
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
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
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
                    $r: 'pass',
                },
                'relations.0': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relationship': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics': {
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
                },
                'relations.0.relation.demographics.firstName': {
                    $a: {},
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
                    $a: {},
                    $v: {
                        $m: null,
                        $r: 'pass',
                    },
                    $r: 'pass',
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
