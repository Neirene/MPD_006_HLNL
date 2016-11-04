import "./format";

describe("raet-filters-format.", () => {
    let format;

    beforeEach(() => angular.mock.module("raet-ui"));

    beforeEach(inject(["$filter", (_$filter_) => {
        format = _$filter_('format');
    }]));

    it('Empty value', () => {
        expect(format(null)).toEqual(null);
    });

    it('Missing parameters', () => {
        expect(format("param: {0}")).toEqual("param: {0}");
    });

    it('Multiple substitutions', () => {
        expect(format("param1: {0}, param2: {1}, param3: {2}, param4: {3}, param1: {0}", "one", "two", "three"))
            .toEqual("param1: one, param2: two, param3: three, param4: {3}, param1: one");
    });

    it('Curly braces escaping', () => {
        expect(format("param1: {{0}}, param2: {{1}}, param3: {2}, param4: {{0}}", "one", "two", "three", "four"))
            .toEqual("param1: {0}, param2: {1}, param3: three, param4: {0}");
    });
});