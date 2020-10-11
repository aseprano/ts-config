import { CompositeConfig } from "../src/impl/CompositeConfig"
import { InMemoryConfig } from "../src/impl/InMemoryConfig";
import { mock, when, instance } from "ts-mockito";

describe('CompositeConfig', () => {

    it('looks for values in the outer configuration first', () => {
        const requestOrder: Array<string> = [];
        const outerConfig = mock(InMemoryConfig);
        const innerConfig = mock(InMemoryConfig);

        when(outerConfig.has('somekey')).thenCall(() => {
            requestOrder.push('outer');
            return false;
        });

        when(innerConfig.has('somekey')).thenCall(() => {
            requestOrder.push('inner');
            return false;
        });

        const composite = new CompositeConfig(instance(outerConfig), instance(innerConfig));
        expect(composite.has('somekey')).toBe(false);
        expect(requestOrder).toEqual(['outer', 'inner']);
    });

})