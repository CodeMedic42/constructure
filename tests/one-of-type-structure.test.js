import chai from 'chai';
import Structure from '../src';

const { expect } = chai;

describe('Shape Structure', () => {
    describe('Complex Structure', () => {
        const structure = Structure.shape({
            testString: Structure.string(),
            testOneOfType: Structure.oneOfType([
                Structure.string(),
                Structure.number(),
                Structure.shape({
                    testString: Structure.string(),
                    testNumber: Structure.number(),
                }),
            ]),
        });

        it('Property not defined', () => {
            const value = {
                testString: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property null', () => {
            const value = {
                testString: 'test',
                testOneOfType: null,
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property string', () => {
            const value = {
                testString: 'test',
                testOneOfType: 'test',
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property number', () => {
            const value = {
                testString: 'test',
                testOneOfType: 42,
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                    },
                });
            });
        });

        it('Property object', () => {
            const value = {
                testString: 'test',
                testOneOfType: {},
            };

            return structure.run(value).then((result) => {
                expect(result).to.eql({
                    $r: 'pass',
                    $a: {},
                    testString: {
                        $r: 'pass',
                        $a: {},
                    },
                    testOneOfType: {
                        $r: 'pass',
                        $a: {},
                        testString: {
                            $r: 'pass',
                            $a: {},
                        },
                        testNumber: {
                            $r: 'pass',
                            $a: {},
                        },
                    },
                });
            });
        });
    });
});
