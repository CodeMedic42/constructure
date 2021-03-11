import chai from 'chai';
import Structure from '../src';
import example01Logic from '../examples/example-01/src/logic';

const { expect } = chai;

xdescribe('Example 01', () => {
    it('Regular', () => {
        return example01Logic(Structure).then((result) => {
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
                    $r: 'pass',
                },
                demographics: {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.firstName': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.middleName': {
                    $a: {},
                    $r: 'pass',
                },
                'demographics.lastName': {
                    $a: {},
                    $r: 'pass',
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
                    $r: 'pass',
                },
                'relations.0': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relationship': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.firstName': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.middleName': {
                    $a: {},
                    $r: 'pass',
                },
                'relations.0.relation.demographics.lastName': {
                    $a: {},
                    $r: 'pass',
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
