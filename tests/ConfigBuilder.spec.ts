import { ConfigBuilder } from "../src/ConfigBuilder";
import { InMemoryConfig } from "../src/impl/InMemoryConfig";

describe('ConfigBuilder', () => {
    const config = ConfigBuilder.withOutmostConfig(new InMemoryConfig({age: 100, gender: 'male', level: 9000}))
        .thatFallbacksTo(new InMemoryConfig({age: 90, gender: 'hybrid'}))
        .thatFallbacksTo(new InMemoryConfig({age: 80}))
        .build();

    it('builds the proper composition', () => {
        expect(config.get<number>('age')).toBe(80);
        expect(config.get<string>('gender')).toBe('hybrid');
        expect(config.get<number>('level')).toBe(9000);
    });

    it('returns the default value only if no value is found along the chain', () => {
        expect(config.get<number>('age',    1000)).toBe(80);
        expect(config.get<string>('gender', 'AAAA')).toBe('hybrid');
        expect(config.get<number>('level',  1234)).toBe(9000);
        expect(config.get<string>('name',   'XXX')).toBe('XXX');
    });

});
